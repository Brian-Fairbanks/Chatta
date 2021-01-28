import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FriendSearch from "../components/FriendSearch";
import FriendsWell from "../components/FriendsWell";
import MessageWell from "../components/MessageWell";
// import API from "../../utils/API";

const useStyles = makeStyles({
});

function ChatPage(){
    // set up styles for use by elements
    const classes = useStyles();

  return(
    <Box>
      <Grid container>
        <Grid item xs={3}>
          {/* <SelfSettings/> */}
          <FriendSearch/>
          <FriendsWell/>
        </Grid>
        <Grid item xs={9}>
          <MessageWell/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ChatPage