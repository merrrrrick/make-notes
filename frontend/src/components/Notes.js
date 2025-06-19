import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';


export const Notes = (props ) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote, getUser, user, setUser } = context;
    const [note, setNote] = useState({id:"", etitle:"", edescription:"", etag:""})
    const [vnote, setVnote] = useState({id:"",title:"", description:"", tag:""})

    
    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        if(localStorage.getItem('Token')){
        getNotes();
        getUser();
    }
        else{
            navigate('/login')
        }
        //eslint-disable-next-line
    }, [])



    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle: currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    }

    const refView = useRef(null);

    const viewNote = (currentNote) => {
        refView.current.click();
        setVnote({ id: currentNote.id, title: currentNote.title, description: currentNote.description })
    }


    const handleClick = (e) =>{
        editNote(note.id, note.etitle,note.edescription,note.etag)
        refClose.current.click();
    }

    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <Addnote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content update-form">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} minLength={1} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={1} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} maxLength={10} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<1 || note.edescription.length<1} type="button" className="btn btn-primary save" onClick={handleClick} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>




            <button type="button" ref={refView} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                Launch demo modal
            </button>

            <div className="modal fade modal-dialog-scrollable" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content view-form">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 css" id="exampleModalLabel"> {vnote.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body view-wrap">
                        <p className="card-text css">{vnote.description}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>



            <div className="container row my-4">
                <h1>Your Notes.</h1>
                
                <h4 className='mx-2'>{notes.length === 0 && 'No notes to display'}</h4>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} viewNote={viewNote} note={note} user={user} />
                })}
            </div>
        </>
    )
}
