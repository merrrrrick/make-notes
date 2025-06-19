import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';


const Addnote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"", description:"", tag:""})

    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
        
    }

    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div className='add-note container'>
            <h1>Add Notes.</h1>
            <form className='add-note-form'>
                <div className="mb-2">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={note.title} className="form-control" id="title" name='title'  onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" value={note.description} className="form-control" id="description" name='description' onChange={onChange} minLength={1} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" value={note.tag} className="form-control" id="tag" name='tag' onChange={onChange} minLength={1} maxLength={10}  />
                </div>
                <button disabled={note.title.length<1 ||note.description.length<1} type="submit" className="btn btn-primary"onClick={handleClick} >Add</button>
            </form>
        </div>
    )
}

export default Addnote