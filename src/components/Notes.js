import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitems from './Noteitems';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(noteContext);
  const {notes, getNotes} = context;
  useEffect(()=>{
    getNotes();
  });
  return (
    <>
      <AddNote />
      <div className='row my-3'>
        <h3>Your Notes</h3>
        {notes.map((note)=>{
          return <Noteitems key={note._id} note={note}/>
        })}
      </div>
    </>
  )
}

export default Notes
