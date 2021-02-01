import { Box, Grid, Typography, makeStyles, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content:{
    padding:9,
    color:"#fff",
    background:`linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.secondary})`,
    borderRadius:"0px 10px 10px 10px",
  },
  avatar:{
    width:30,
    height:30,
    marginRight:8,
  }

}));

function Message(props){
  const classes = useStyles();

  return(
    <Grid container alignItems="center">

      <Grid item>
        <Avatar className={classes.avatar} src={props.image}></Avatar>
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