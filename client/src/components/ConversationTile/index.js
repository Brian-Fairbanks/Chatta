import { Box, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title:{
    padding:9,
    overflow:"hidden"
  }
}));

function ConversationTile(props){
  const classes = useStyles();

  return(
  <Grid container>
    <Grid item>
      <img src={props.image} width="44px" height="44px"/>
    </Grid>
    
    <Grid item container direction="column" xs={8} className={classes.title}>
      <Grid item xs>
        {props.title}
      </Grid>
      <Grid item xs>
        {props.message}
      </Grid>
    </Grid>

    <Grid item flexGrow={1}>
      2
    </Grid>
  </Grid>
  )
}

export default ConversationTile;
