import React, { useContext, useEffect } from "react";
import { Box, fade, makeStyles } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import UserTile from "../UserTile";
import API from "../../utils/API";
import useDebounce from "../../utils/debounce";
import { ChatroomContext } from "../../utils/ChatroomContext";

const useStyles = makeStyles((theme) => ({
  searchContent: {
    color: theme.palette.primary.faded,
    fontWeight: "600",
    paddingLeft: 26,
  },
  search: {
    color: theme.palette.primary.faded,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    margin: 10,
    marginRight: 0,
    marginLeft: 0,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  searchIcon: {
    padding: theme.spacing(0, 0.5),
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

// Sample friend data untill the back end is working correctly
// Friend Well Creation
function FriendSearch() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const { setConversation, setParticipants, setMessages } = useContext(
    ChatroomContext
  );

  // set pu data for the conversation
  async function changeConversation(id) {
    const data = await API.getUser({ id });
    console.log(data);
    setConversation("TBD");
    setMessages([]);
    setParticipants([data.dbModel]);
  }

  // Handle updating the sate for the search field
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Debounce
  const debounceSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    async function grabUsers() {
      const data = await API.FindOtherUsers(searchTerm);
      setSearchResults(data.dbModel);
    }
    if (searchTerm) grabUsers();
    else {
      setSearchResults();
    }
  }, [debounceSearchTerm]);

  return (
    <Box>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <i className="fas fa-search"></i>
        </div>
        <InputBase
          placeholder="Search…"
          value={searchTerm}
          onChange={handleChange}
          className={classes.searchContent}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      {!searchResults
        ? ""
        : searchResults.map((user) => {
            return (
              <Box
                key={user._id}
                onClick={() => {
                  changeConversation(user._id);
                }}
              >
                <UserTile image={user.image} username={user.username} />
              </Box>
            );
          })}
      <hr />
    </Box>
  );
}

export default FriendSearch;
