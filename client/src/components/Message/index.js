import { Box, Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content:{
    padding:9,
    color:"#fff",
    background:`linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.secondary})`,
    borderRadius:"0px 10px 10px 10px",
  }
}));

function Message(props){
  const classes = useStyles();

  return(
    <Grid container alignItems="center" spacing={2}>

      <Grid item>
        <img src={props.image} width="30px" height="30px"></img>
      </Grid>

      <Grid item direction="row">
        <Box>
  <Typography variant="subtitle2">{props.username} {props.timeStamp}</Typography>
        </Box>
        <Box className={classes.content}>
          {props.content}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Message;