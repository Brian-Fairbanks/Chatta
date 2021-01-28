import { Box, Grid } from "@material-ui/core";

function FriendTile(props){

  return(
  <Grid container spacing={3}>
    <Grid item xs={2}>
      <img src={props.image} width="44px" height="44px"/>
    </Grid>
    
    <Grid item container>
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

export default FriendTile;
