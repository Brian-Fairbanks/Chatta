import { Box, Grid, makeStyles, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title:{
    overflow:"hidden",
    textOverflow: 'ellipsis !important',
    overflowWrap:"unset",
    whiteSpace: "nowrap"
  },
  conImg:{
    width:44,
    height:44,
    marginRight:8
  }
}));

function ConversationTile(props){
  const classes = useStyles();

  return(
  <Grid container flexWrap="nowrap" >
    <Grid item xs={2}>
      <Avatar src={props.image} className={classes.conImg}/>
    </Grid>
    
    <Grid item container direction="column" xs={8}>
      <Grid item xs className={classes.title}>
        {props.title}
      </Grid>
      <Grid item xs className={classes.title}>
        {props.message}
      </Grid>
    </Grid>

    <Grid item flexShrink={1}>
      2
    </Grid>
  </Grid>
  )
}

export default ConversationTile;
