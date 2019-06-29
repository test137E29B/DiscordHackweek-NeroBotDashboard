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
    automodEnabled: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      margin: theme.spacing(1)
    },
    warnsEnabled: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      margin: theme.spacing(1)
    }
  })
);

export const FeaturesForm = () => {
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
      automod: { enabled: values.automodEnabled || false },
      warns: { enabled: values.warnsEnabled || false }
    };

    if (!!auth.token && !!guildId) {
      const response = await updateGuildSettings(auth.token, guildId, updates);
      console.warn(response);
      // If success show snackbar, or if error.
    }
  };

  const onChange = (name: string, value: any) => {
    // console.info(`Field ${name} updated to ${value}`);
  };

  const fields = [
    {
      type: FormFieldType.SWITCH,
      name: "automodEnabled",
      label: "AutoMod Enabled",
      helpText:
        "Should Automatic Moderation of messages be enabled in your server?",
      initialValue: guild && guild.automod ? guild.automod.enabled : false
    },
    {
      type: FormFieldType.SWITCH,
      name: "warnsEnabled",
      label: "Warning Punishments Enabled",
      helpText: "Should Warnings be Automatically Punished in your server?",
      initialValue: guild && guild.warns ? guild.warns.enabled : false
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
