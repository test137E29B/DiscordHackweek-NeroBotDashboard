import React, { useEffect } from "react";
import { NeroForm, FormFieldType } from "../../ui/form/NeroForm";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store/store";
import useReactRouter from "use-react-router";
import { GuildSettings, RecursivePartial } from "../../config/customTypes";
import { updateGuildSettings } from "../Guilds/dashboardhook.integration";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    perspectiveEnabled: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      margin: theme.spacing(1)
    },
    perspectiveChannels: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      margin: theme.spacing(1)
    }
  })
);

export const PerspectiveForm = () => {
  const classes = useStyles();
  const auth = useSelector((state: ApplicationState) => state.auth);
  const { guild, guildId } = useSelector(
    (state: ApplicationState) => state.guild
  );
  const { history } = useReactRouter();

  useEffect(() => {
    if (!guild) history.push("/dashboard");
  }, [guild, history]);

  const onSubmit = async (values: { [name: string]: any }) => {
    const updates: RecursivePartial<GuildSettings> = {
      automod: {
        perspective: {
          enabled: values.perspectiveEnabled || false,
          channels: values.perspectiveChannels.split(", ") || []
        }
      }
    };

    if (!!auth.token && !!guildId) {
      const response = await updateGuildSettings(auth.token, guildId, updates);
      console.warn(response);
      // If success show snackbar, or if error.
    }
  };

  const onChange = (name: string, value: any) => {
    console.info(`Field ${name} updated to ${value}`);
  };

  const fields = [
    {
      type: FormFieldType.SWITCH,
      name: "perspectiveEnabled",
      label: "Perspective Enabled",
      helpText:
        "Should Automatic Moderation of messages using Google's Perspective API be enabled in your server?",
      initialValue:
        guild && guild.automod && guild.automod.perspective
          ? guild.automod.perspective.enabled
          : false
    },
    {
      type: FormFieldType.TEXT,
      name: "perspectiveChannels",
      label: "Enabled in Channels",
      helpText:
        "A comma separated list of Channel Ids where Perspective will be used to rate toxicity of messages.",
      initialValue:
        guild && guild.automod && guild.automod.perspective
          ? guild.automod.perspective.channels.join(", ")
          : ""
    }
  ];

  return (
    <NeroForm
      fields={fields}
      onSubmit={onSubmit}
      onChange={onChange}
      customClasses={classes}
      submitButtonText="Save"
    />
  );
};
