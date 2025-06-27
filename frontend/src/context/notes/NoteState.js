import React, { useState } from 'react';
import NoteContext from './noteContext';

 const NoteState = (props) =>{
  const host = "https://make-notes-72a5.onrender.com"
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial)
    const [user, setUser] = useState([])


  //get all notes
  const getNotes = async () =>{
    // todo api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('Token')
      }
    });
    const json = await response.json();
    setNotes(json);
  }


    //Add a  note
    const addNote = async(title, description, tag) =>{
      // todo api call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('Token')
        },
        body: JSON.stringify({title, description, tag})
      });

      
      /// add note llogic
      getNotes();

    }

    //Delete a note
    const deleteNote = async(id) =>{
      //api call
      // eslint-disable-next-line
      const response = await fetch(`${host}/api/notes/deletenote/${id} `, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('Token')
        },
      });





      props.showAlert('Note Deleted!', "dark")
      getNotes();
    }

    //Edit a note
    const editNote = async (id, title, description, tag) =>{
      //API calll
      // eslint-disable-next-line
      const response = await fetch(`${host}/api/notes/updatenote/${id} `, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('Token')
        },
        body: JSON.stringify({title, description, tag})
      });    



      //Logic to edit note
      getNotes();

      props.showAlert('Note Updated', "dark")

    }

    const getUser = async () =>{
      // todo api call
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('Token')
        }
      });
      const json = await response.json();
      setUser(json);
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes, user, getUser, setUser}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;