import { Box, Grid } from "@material-ui/core";

function FriendTile(props){

  return(
  <Grid container>
    <Grid item xs={2}>
      <img src={props.image} width="44px" height="44px"/>
    </Grid>
    
    <Grid container xs={9}>
      <Grid item xs={12}>
        {props.username}
      </Grid>
      <Grid item xs={12}>
        lastMessage
      </Grid>
    </Grid>
    <Grid item xs={1}>
      2
    </Grid>
  </Grid>
  )
}

export default FriendTile;
