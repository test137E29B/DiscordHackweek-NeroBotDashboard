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
    staffMuteRole: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      margin: theme.spacing(1)
    },
    staffWarnRole: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      margin: theme.spacing(1)
    },
    staffKickRole: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      margin: theme.spacing(1)
    },
    staffBanRole: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      margin: theme.spacing(1)
    },
    staffManagerRole: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      margin: theme.spacing(1)
    },
    staffAdminRole: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      margin: theme.spacing(1)
    },
    punishmentMuted: {
      width: `calc(100% - ${theme.spacing(2)}px)`,
      margin: theme.spacing(1)
    }
  })
);

export const SettingsForm = () => {
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
      roles: {
        staff: {
          mute: values.staffMuteRole || "",
          warn: values.staffWarnRole || "",
          kick: values.staffKickRole || "",
          ban: values.staffBanRole || "",
          manager: values.staffManagerRole || "",
          admin: values.staffAdminRole || ""
        },
        punishments: {
          muted: values.punishmentMuted || ""
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
    // console.info(`Field ${name} updated to ${value}`);
  };

  const fields = [
    {
      type: FormFieldType.TEXT,
      name: "staffMuteRole",
      label: "Staff Mute Role ID",
      helpText: "This Role ID is required to Mute other server members.",
      initialValue: guild ? guild.roles.staff.mute : ""
    },
    {
      type: FormFieldType.TEXT,
      name: "staffWarnRole",
      label: "Staff Warn Role ID",
      helpText: "This Role ID is required to Warn other server members.",
      initialValue: guild ? guild.roles.staff.warn : ""
    },
    {
      type: FormFieldType.TEXT,
      name: "staffKickRole",
      label: "Staff Kick Role ID",
      helpText: "This Role ID is required to Kick other server members.",
      initialValue: guild ? guild.roles.staff.kick : ""
    },
    {
      type: FormFieldType.TEXT,
      name: "staffBanRole",
      label: "Staff Ban Role ID",
      helpText: "This Role ID is required to Ban other server members.",
      initialValue: guild ? guild.roles.staff.ban : ""
    },
    {
      type: FormFieldType.TEXT,
      name: "staffManagerRole",
      label: "Staff Manager Role ID",
      helpText:
        "This Role ID is required to access Manager commands in the Bot and bypass bot moderation functions.",
      initialValue: guild ? guild.roles.staff.manager : ""
    },
    {
      type: FormFieldType.TEXT,
      name: "staffAdminRole",
      label: "Staff Admin Role ID",
      helpText:
        "This Role ID is required to access Admin commands in the Bot and bypass bot moderation functions.",
      initialValue: guild ? guild.roles.staff.admin : ""
    },
    {
      type: FormFieldType.TEXT,
      name: "punishmentMuted",
      label: "Muted Role ID",
      helpText: "This Role ID given to Server Members when they are muted.",
      initialValue: guild ? guild.roles.punishments.muted : ""
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
