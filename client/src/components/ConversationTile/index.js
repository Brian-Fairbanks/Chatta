import { Box, Grid, makeStyles, Avatar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  conversationTile: {
    padding: 2,
    paddingTop: 7,
    paddingBottom: 7,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 3,
    "&:hover": {
      background: theme.palette.primary.faded,
    },
  },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis !important",
    overflowWrap: "unset",
    whiteSpace: "nowrap",
  },
  conImg: {
    width: 44,
    height: 44,
    marginRight: 8,
  },
  notify: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: 12,
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: "100%",
  },
}));

function ConversationTile(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.conversationTile}>
      <Grid item xs={2}>
        <Avatar src={props.image} className={classes.conImg} />
      </Grid>

      <Grid item container direction="column" xs={8}>
        <Grid item xs className={classes.title}>
          <Typography variant="h6">{props.title}</Typography>
        </Grid>
        <Grid item xs className={classes.title}>
          <Typography variant="subtitle1">{props.message}</Typography>
        </Grid>
      </Grid>

      <Grid item container xs={1} justify="flex-end" alignItems="center">
        <Box className={classes.notify}>2</Box>
      </Grid>
    </Grid>
  );
}

export default ConversationTile;
