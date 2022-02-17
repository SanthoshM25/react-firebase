import "./App.css";

import { useState } from "react";

import db from "./utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

function App() {
  const [userField, setUserField] = useState("");

  const addUser = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: userField,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  return (
    <div className="App">
      <input
        placeholder="Enter user name"
        onChange={(e) => {
          setUserField(e.target.value);
        }}
        value={userField}
      />
      <button onClick={addUser}>Add user</button>
      <button onClick={fetchData}>Fetch users</button>
    </div>
  );
}

export default App;
