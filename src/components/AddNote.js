import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:"default"});

    const handleClick = () =>{
        addNote(note.title, note.description, note.tag)
    };

    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value});
    };
  return (
    <div>
      <h1>Add a Note</h1>

      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className='container my-3'>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
