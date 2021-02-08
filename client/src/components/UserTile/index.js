import { Avatar, Box, Grid, makeStyles } from "@material-ui/core";
import StatusIndicator from "../StatusIndicator";

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44,
    marginRight: 8,
  },
});

function ConversationTile(props) {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Grid item>
        <Box position="relative" display="flex" flexDirection="row" mr={2}>
          <Avatar
            src={props.image}
            className={classes.avatar}
            alt={`${props.title} avatar`}
          />
          <StatusIndicator status={props.status} />
        </Box>
      </Grid>

      <Grid item>{props.username}</Grid>
    </Grid>
  );
}

export default ConversationTile;
