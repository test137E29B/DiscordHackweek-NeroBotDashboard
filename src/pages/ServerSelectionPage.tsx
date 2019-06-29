import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { useSelector, connect } from "react-redux";
import { ApplicationState } from "../store/store";
import { Paper, TableCell } from "@material-ui/core";
import {
  MuiTable,
  MuiTableColumnItem,
  MuiTableToolbarItems
} from "../ui/table/MuiTable";
import { DiscordGuild, GuildSettings } from "../config/customTypes";
import { AccessButton } from "../components/ServerSelection/AccessButton";
import useReactRouter from "use-react-router";
import { setGuild } from "../store/actions/guildActions";
import { Dispatch } from "redux";
import { getGuildSettings } from "../components/Guilds/dashboardhook.integration";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2)
    }
  })
);

interface ServerSelectionPageProps {
  setGuild: (guild?: GuildSettings, guildId?: string) => Promise<void>;
}

const ServerSelectionPage = (props: ServerSelectionPageProps) => {
  const classes = useStyles();
  const [isSearching, setSearching] = useState(false);
  const { setGuild } = props;
  const { history } = useReactRouter();
  const auth = useSelector((state: ApplicationState) => state.auth);
  const guilds: DiscordGuild[] = auth.user ? auth.user.guilds : [];
  const [filteredGuilds, setFilteredGuilds]: [
    DiscordGuild[],
    React.Dispatch<React.SetStateAction<DiscordGuild[]>>
  ] = useState(auth.user ? auth.user.guilds : []);

  useEffect(() => {
    if (!auth.token) history.push("/login");
    // eslint-disable-next-line
  }, []);

  // Filter Guilds
  const handleSearchClick = async (guildName: string) => {
    setSearching(true);
    const filtered = guilds.filter(
      guild => guild.name.indexOf(guildName) !== -1
    );
    setFilteredGuilds(filtered);
    setSearching(false);
  };

  // Fetch Server Settings from Klasa Bot
  const handleServerSelect = async (guildId: string) => {
    if (!auth.token) return;
    const response = await getGuildSettings(auth.token, guildId);

    if (!!response.success && !!response.data) {
      setGuild(response.data, guildId);
      history.push("/features");
    } else setGuild();
  };

  const columns: MuiTableColumnItem[] = [
    { id: "name", label: "Guild Name" },
    {
      id: "isGuildOwner",
      label: "Is Owner?",
      render: (guild: DiscordGuild) => {
        return (
          <TableCell key={`${guild.id}-isGuildOwner`}>
            {guild.userIsOwner ? "Yes" : "No"}
          </TableCell>
        );
      }
    },
    {
      id: "configureGuild",
      label: "Action",
      render: (guild: DiscordGuild) => {
        return (
          <TableCell key={`${guild.id}-configureGuild`}>
            <AccessButton
              variant="text"
              color="primary"
              onClick={() => handleServerSelect(guild.id)}
            >
              Configure
            </AccessButton>
          </TableCell>
        );
      }
    }
  ];

  const toolbarItems: MuiTableToolbarItems = {
    search: {
      searchPending: isSearching,
      onSearch: handleSearchClick,
      placeholder: "Search by Guild Name"
    }
  };

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        {/* SERVER SELECTION TABLE */}
        <MuiTable
          toolbarItems={toolbarItems}
          data={filteredGuilds}
          columns={columns}
        />
      </Paper>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setGuild: (guild?: GuildSettings, guildId?: string) =>
    setGuild(guild, guildId)(dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(ServerSelectionPage);
