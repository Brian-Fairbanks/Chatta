import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FriendSearch from "../components/FriendSearch";
import ConversationWell from "../components/ConversationWell";
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
          <Box p={3}>
            {/* <SelfSettings/> */}
            <Typography variant="h1">Chats</Typography>
            <FriendSearch/>
            <ConversationWell/>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <MessageWell/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ChatPage