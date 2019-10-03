import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Switch,
  Modal,
  FormControl,
  FormGroup,
  FormControlLabel,
  Button,
  Typography
} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

function getModalStyle() {
  const top = 0;
  const left = 0;
  const bottom = 0;
  const right = 0;

  return {
    top: `${top}%`,
    left: `${left}%`,
    bottom: `${bottom}%`,
    right: `${right}%`,

    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    paddingTop: theme.spacing(10),
    outline: "none"
  },
  fab: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2)
  },
  form: {
    display: "block"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function SimpleModal({
  open,
  onClose,
  action,
  handleAdd,
  editting,
  submitEdit
}) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [name, setName] = React.useState("");
  const [status, setStatus] = React.useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    if (action === "Edit Todo") {
      setName(editting.name);
      setStatus(editting.status);
    }
  }, [action, editting]);

  function handleSubmit() {
    if (action === "Add Todo") {
      handleAdd(name, status);
    } else {
      submitEdit(editting.id, name, status);
    }

    setName("");
    setStatus(false);
    onClose();
  }

  const changeName = e => {
    setName(e.target.value);
  };
  function changeStatus(e) {
    setStatus(!status);
  }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <Fab color="secondary" className={classes.fab} onClick={onClose}>
          <CloseIcon />
        </Fab>
        <Typography variant="h3">{action}</Typography>
        <FormControl className={classes.form} component="fieldset">
          <FormGroup>
            <TextField
              id="outlined-name"
              label="Name"
              margin="normal"
              variant="outlined"
              fullWidth
              name="name"
              onChange={changeName}
              value={name}
            />
          </FormGroup>
        </FormControl>
        <FormControl className={classes.form}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  onChange={changeStatus}
                  checked={status}
                  value="checkedA"
                  color="primary"
                  inputProps={{ "aria-label": "Switch A" }}
                />
              }
              label="Status"
            />
          </FormGroup>
        </FormControl>
        <FormControl className={classes.form}>
          <FormGroup>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              size="medium"
              onClick={handleSubmit}
            >
              {action === "Add Todo" ? <AddIcon /> : <EditIcon />}
            </Button>
          </FormGroup>
        </FormControl>
      </div>
    </Modal>
  );
}
