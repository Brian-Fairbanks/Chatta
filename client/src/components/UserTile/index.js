import { Box, Grid } from "@material-ui/core";

function ConversationTile(props){

  return(
  <Grid container spacing={2}>
    <Grid item xs={2}>
      <img src={props.image} width="44px" height="44px"/>
    </Grid>
    
    <Grid item xs={10}>
      {props.username}
    </Grid>
  </Grid>
  )
}

export default ConversationTile;
