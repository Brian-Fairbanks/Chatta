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
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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

  flexGrow: {
    display: "flex",
    flexBasis: 0,
    minWidth: 0,
    overflow: "hidden",
    flexGrow: 1,
  },

  flexFixed: {
    flexBasis: 0,
  },
}));

function ConversationTile(props) {
  const classes = useStyles();

  return (
    <Grid container direction="row" className={classes.conversationTile}>
      <Grid item className={classes.flexFixed}>
        <Avatar
          src={props.image}
          className={classes.conImg}
          alt={`${props.title} avatar`}
        />
      </Grid>

      <Grid item container direction="column" className={classes.flexGrow}>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
        <Typography variant="subtitle1" className={classes.title}>
          {props.message}
        </Typography>
      </Grid>

      <Grid
        item
        container
        className={classes.flexFixed}
        justify="flex-end"
        alignItems="center"
      >
        <Box className={classes.notify}>2</Box>
      </Grid>
    </Grid>
  );
}

export default ConversationTile;
