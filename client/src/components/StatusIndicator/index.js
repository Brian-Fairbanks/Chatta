import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  base: {
    width: 9,
    height: 9,
    borderRadius: 100,
    border: `2px solid ${theme.palette.common.white}`,
    background: theme.palette.primary.offline,
  },

  image: {
    zIndex: 3,
    position: "absolute",
    bottom: "10%",
    right: "10%",
  },
  standAlone: {},

  online: {
    background: theme.palette.primary.online,
  },
}));

export default function StatusIndicator(props) {
  const classes = useStyles();
  return (
    <Box
      className={[
        classes.base,
        classes[props.status],
        classes[props.standAlone ? "standalone" : "image"],
      ]}
    ></Box>
  );
}
