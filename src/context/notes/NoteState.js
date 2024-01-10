import React, { useState } from 'react'
import NoteContext from './noteContext';

const NoteState = (props)=>{
  const host = "http://localhost:5000";
    const notesIntial = [];
      const [notes, setNotes] = useState(notesIntial);

      //get notes
      const getNotes = async ()=>{
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MmQzZWIzMzA0ZDUxNjI1ZWI0MWU4In0sImlhdCI6MTcwMzYwOTAyNH0.5Punrb5nfUbJMv3UdIWwQmLK_TxyFMYXHnfyjrgJF6I"
          },
        });
        const json = await response.json();
        setNotes(json);
        // console.log(json);
      };


      //Add a note
      const addNote = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MmQzZWIzMzA0ZDUxNjI1ZWI0MWU4In0sImlhdCI6MTcwMzYwOTAyNH0.5Punrb5nfUbJMv3UdIWwQmLK_TxyFMYXHnfyjrgJF6I"
          },
          body: JSON.stringify({title, description, tag}),
        });
        const json = response.json();
        console.log(json);

        const note = {
          "_id": "658b03ac872a6ff80f2c5974",
          "user": "6582d3eb3304d51625eb41e8",
          "title": title,
          "description": description,
          "tag": "Personal life",
          "date": tag,
          "__v": 0
        };
        setNotes(notes.concat(note));
      };

      //Delete a note
      const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MmQzZWIzMzA0ZDUxNjI1ZWI0MWU4In0sImlhdCI6MTcwMzYwOTAyNH0.5Punrb5nfUbJMv3UdIWwQmLK_TxyFMYXHnfyjrgJF6I"
          },
        });
        const json = response.json();
        console.log(json);
        const newNote = notes.filter((note)=>{return note._id !== id});
        setNotes(newNote);
      };

      //Edit a note
      const editNote = async (id, title, description, tag) => {

        //api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4MmQzZWIzMzA0ZDUxNjI1ZWI0MWU4In0sImlhdCI6MTcwMzYwOTAyNH0.5Punrb5nfUbJMv3UdIWwQmLK_TxyFMYXHnfyjrgJF6I"
          },
          body: JSON.stringify({title, description, tag}),
        });
        const json = response.json();
        console.log(json);

        //logic for edit note
        for (let i = 0; i < notes.length; i++) {
          const element = notes[i];
          if (element._id === id) {
            element.title = title;
            element.description = description;
            element.tag = tag;
          };
        };
      };

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;