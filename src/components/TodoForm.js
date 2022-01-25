import React, {useState, useEffect, useRef} from 'react';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { updateDoc } from "firebase/firestore";
firebase.initializeApp({
  apiKey: "AIzaSyDH7QSQWRcY0WBdYfsEd1vnTkhJkGB_gpg",
  authDomain: "react-app-45ca7.firebaseapp.com",
  projectId: "react-app-45ca7",
  storageBucket: "react-app-45ca7.appspot.com",
  messagingSenderId: "382610521698",
  appId: "1:382610521698:web:2db4d7bfb567a09062db3b"
})

const db = firebase.firestore();

function TodoForm(props) {
 const [input, setInput] = useState(props.edit ? props.edit.value :'');

 const inputRef = useRef(null) 
 useEffect(() =>{
    inputRef.current.focus()
 })

//  useEffect(() => {
//     inputRef.current.focus();
//   });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // let id = Math.floor(Math.random() * 10000);
    props.onSubmit({
      id: input,
      text: input
    });
    await db.collection('todos')
    .doc(input)
    .set({
    text: input
    })
    .then(function () {
    console.log("Value successfully written!");
    })
    .catch(function (error) {
    console.error("Error writing Value: ", error);
    });
    setInput('');
  };
return (
    <form className='todo-form'onSubmit={handleSubmit}> 
    {props.edit ? (
      <>
       < input
        type='text'
        placeholder = 'Update your item'
        value = {input}
        name = 'text'
        className = 'todo-input edit'
        onChange = {handleChange}
        ref ={inputRef}
        />
        <button className = 'todo-button edit'>Update</button>
      </>
        ) :  (
      <>
        < input
        type='text'
        placeholder = 'Add citymall todo'
        value = {input}
        name = 'text'
        className = 'todo-input'
        onChange = {handleChange}
        ref ={inputRef}
        />
        <button className = 'todo-button'>Add todo</button>
      </>
        )
        }
        
    </form>
  );
}

export default TodoForm;
