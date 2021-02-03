import { Box, Grid, Typography, makeStyles, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  message: {
    marginTop: 60,
  },

  content: {
    padding: 9,
    color: "#fff",
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.secondary})`,
    borderRadius: "0px 10px 10px 10px",
  },

  selfContent: {
    padding: 9,
    background: theme.palette.primary.selfLight,
    color: theme.palette.primary.selfDark,
    borderRadius: "10px 10px 0px 10px",
    textAlign: "right",
  },

  avatar: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
}));

function Message(props) {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.message}
      alignItems="center"
      direction={props.isSelf ? "row-reverse" : "row"}
    >
      {props.isSelf ? (
        ""
      ) : (
        <Grid item>
          <Avatar className={classes.avatar} src={props.image}></Avatar>
        </Grid>
      )}

      <Grid item>
        <Box>
          <Typography variant="subtitle2">
            {props.isSelf ? "" : props.username} {props.timeStamp}
          </Typography>
        </Box>
        <Box className={props.isSelf ? classes.selfContent : classes.content}>
          <Typography variant="body1">{props.content}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Message;
