import { routes } from "./routes";
// import Announcement from "@material-ui/icons/Announcement";
import Dashboard from "@material-ui/icons/Dashboard";
import Info from "@material-ui/icons/Info";
import LinkOff from "@material-ui/icons/LinkOff";
import NotInterested from "@material-ui/icons/NotInterested";
import SettingsApplications from "@material-ui/icons/SettingsApplications";
import Storage from "@material-ui/icons/Storage";
import ThumbsUpDown from "@material-ui/icons/ThumbsUpDown";

export interface Page extends Partial<PageChild> {
  children?: Page[];
}

export interface PageChild {
  icon: any;
  title: string;
  description: string;
  pathname: string;
}

export const pages: Page[] = [
  {
    children: [
      {
        pathname: routes.DASHBOARD,
        icon: Dashboard,
        title: "Server Selection",
        description: "Select a server to edit it's Nero settings."
      },
      {
        pathname: routes.FEATURES,
        icon: Storage,
        title: "Features",
        description:
          "Control which features are enabled in your selected server."
      }
    ]
  },
  {
    title: "AUTOMOD",
    children: [
      {
        pathname: routes.AUTOMOD_PERSPECTIVE,
        icon: ThumbsUpDown,
        title: "Perspective",
        description:
          "Perspective automatically analyses messages for toxicity or rudeness and scores them. You can run commands automatically when messages reach configurable thresholds."
      },
      {
        pathname: routes.AUTOMOD_WORDS,
        icon: NotInterested,
        title: "Words",
        description:
          "Blacklist words, and perform commands if they are sent in a message by a user."
      },
      {
        pathname: routes.AUTOMOD_INVITES,
        icon: LinkOff,
        title: "Invites",
        description:
          "Blacklist advertising other Discord Servers, and perform commands if they are sent in a message by a user."
      }
      // {
      //   pathname: routes.AUTOMOD_SPAM,
      //   icon: Announcement,
      //   title: "Spam",
      //   description:
      //     "Prevent against spam, and perform commands if a user is spamming a channel."
      // }
    ]
  },
  {
    title: "ROLES",
    children: [
      {
        pathname: routes.ROLES_SETTINGS,
        icon: SettingsApplications,
        title: "Settings",
        description:
          "Edit Guild Roles that the bot uses to identify staff, or muted users."
      }
    ]
  },
  {
    children: [
      {
        pathname: routes.ABOUT,
        icon: Info,
        title: "About",
        description: "What is Nero? Find out here."
      }
    ]
  }
];
