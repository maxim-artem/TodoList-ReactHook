import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardActions, Switch, Fab } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  card: {
    position: "relative",
    width: "100%",
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    boxShadow: "0 9px 18px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);"
  },
  switch: {
    position: "absolute",
    top: theme.spacing(3),
    right: theme.spacing(2)
  }
}));

export default memo(function Item({
  name,
  id,
  status,
  handleComplete,
  handleDelete,
  handleEdit
}) {
  const classes = useStyles();

  function onComplete(id) {
    handleComplete(id);
  }
  function onDelete(id) {
    handleDelete(id);
  }
  function onEdit() {
    handleEdit(id, name, status);
  }
  return (
    <Card className={classes.card} key={id}>
      <CardHeader
        title={name}
        subheader={
          <Switch
            className={classes.switch}
            value={name}
            checked={status}
            onChange={() => onComplete(id)}
            color="primary"
            inputProps={{ "aria-label": name }}
          />
        }
      />
      <CardActions>
        <Fab color="primary" onClick={() => onEdit()} aria-label="Edit Todo">
          <EditIcon />
        </Fab>
        <Fab color="secondary" aria-label="Delete" onClick={() => onDelete(id)}>
          <DeleteIcon />
        </Fab>
      </CardActions>
    </Card>
  );
});
