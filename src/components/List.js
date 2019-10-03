import React, { memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Modal from "../Modal";
import Item from "./Item";
import firebase from "../helpers/firebase";

const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default memo(function PersistentDrawerLeft() {
  const classes = useStyles();
  const [modal, setModal] = React.useState(false);
  const [action, setAction] = React.useState("Add todo");
  const [editting, setEditting] = React.useState({});
  const [todos, setTodo] = React.useState([]);
  const ref = firebase.database().ref("todo");

  React.useEffect(() => {
    ref.on("value", snapshot => {
      const state = snapshot.val();
      setTodo(state);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleModalOpen() {
    setAction("Add Todo");
    setModal(true);
  }

  function handleModalClose() {
    setModal(false);
  }

  function handleDelete(id) {
    ref.child(id).remove();
  }

  function handleComplete(id) {
    ref.child(id).set({ ...todos[id], status: !todos[id].status });
  }

  function handleAdd(name, status) {
    const refPost = ref.push();
    refPost.set({
      id: new Date().getTime().toString(),
      name: name,
      status: status
    });
  }

  function handleEdit(id, name, status) {
    setAction("Edit Todo");
    setEditting({ id, name, status });
    setModal(true);
  }

  function submitEdit(id, name, status) {
    ref.child(id).set({ name: name, status: status });
    setModal(false);
  }

  return (
    <>
      <List>
        {todos &&
          Object.keys(todos).map(key => {
            return (
              <Item
                key={todos[key].id}
                id={key}
                name={todos[key].name}
                status={todos[key].status}
                handleComplete={handleComplete}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            );
          })}
      </List>
      <Modal
        open={modal}
        action={action}
        onClose={handleModalClose}
        handleAdd={handleAdd}
        editting={editting}
        submitEdit={submitEdit}
      />
      <Fab color="primary" className={classes.fab} onClick={handleModalOpen}>
        <AddIcon />
      </Fab>
    </>
  );
});
