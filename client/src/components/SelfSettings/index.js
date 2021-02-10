import { Avatar, Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { useContext } from "react";
import { theme } from "../../themes/theme";
import { UserContext } from "../../utils/UserContext";
import StatusIndicator from "../StatusIndicator";

const useStyles = makeStyles({
  avatar: {
    width: 44,
    height: 44,
    marginRight: 8,
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
          <Box position="relative" display="flex" flexDirection="row" mr={2}>
            <Avatar
              className={classes.avatar}
              src={user.image}
              alt={`${user.username} avatar`}
            />
            <StatusIndicator status={user.status} />
          </Box>
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
