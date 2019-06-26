import { routes } from "./routes";
import SettingsApplications from "@material-ui/icons/SettingsApplications";

export interface Page extends Partial<PageChild> {
  children?: Page[];
}

export interface PageChild {
  icon: any;
  title: string;
  pathname: string;
}

export const pages: Page[] = [
  {
    children: [
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Ungrouped Setting"
      },
      {
        pathname: routes.AUTOMOD_SETTING2,
        icon: SettingsApplications,
        title: "Ungrouped Setting 2"
      }
    ]
  },
  {
    title: "AUTOMOD",
    children: [
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Setting 1"
      },
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Setting 2"
      },
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Setting 3"
      },
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Setting 4"
      },
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Setting 5"
      },
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Setting 6"
      }
    ]
  },
  {
    title: "OTHER SETTING GROUP",
    children: [
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Setting 1"
      },
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Setting 2"
      },
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Setting 3"
      },
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Setting 4"
      },
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Setting 5"
      },
      {
        pathname: routes.AUTOMOD_MUTES,
        icon: SettingsApplications,
        title: "Setting 6"
      }
    ]
  }
];
