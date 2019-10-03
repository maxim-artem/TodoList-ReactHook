import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDASNX2DQGLr16eVBBQMRV63xOuK2xiM6M",
  authDomain: "todo-b6ce5.firebaseapp.com",
  databaseURL: "https://todo-b6ce5.firebaseio.com",
  projectId: "todo-b6ce5",
  storageBucket: "",
  messagingSenderId: "260914275966",
  appId: "1:260914275966:web:cf6a12ea445778c4"
};

export default (!firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app());
