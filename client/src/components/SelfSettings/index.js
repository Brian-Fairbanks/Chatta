import { Avatar, Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { useContext } from "react";
import { theme } from "../../themes/theme";
import { UserContext } from "../../utils/UserContext";

const useStyles = makeStyles({
  avatar: {
    marginRight: 20,
  },
  themeColor: {
    color: theme.palette.primary.faded,
  },
});

export default function SelfSettings() {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  return (
    <Box className={classes.shadowBox} my={3}>
      <Grid container direction="row" alignItems="center">
        <Grid item container direction="row" alignItems="center" xs={11}>
          <Avatar
            className={classes.avatar}
            src={user.image}
            alt={`${user.username} avatar`}
          ></Avatar>
          <Typography variant="h5">{user.username}</Typography>
        </Grid>
        {/* settings aligns to far right */}
        <Grid item container xs={1} justify="flex-end">
          <i className={`${classes.themeColor} fas fa-ellipsis-h`}></i>
        </Grid>
      </Grid>
    </Box>
  );
}
