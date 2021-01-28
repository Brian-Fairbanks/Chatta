import { Box, Grid } from "@material-ui/core";

function ConversationTile(props){

  return(
  <Grid container spacing={2}>
    <Grid item xs={2}>
      <img src={props.image} width="44px" height="44px"/>
    </Grid>
    
    <Grid item container xs={9}>
      <Grid item>
        {props.title}
      </Grid>
      <Grid item>
        {props.message}
      </Grid>
    </Grid>
    <Grid item xs={1}>
      2
    </Grid>
  </Grid>
  )
}

export default ConversationTile;
