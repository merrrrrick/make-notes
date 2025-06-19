import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';


const Noteitem = (props) => {

    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, viewNote, user } = props;
    return (
        <div className='col-md-3 my-2'> 
            <div className="card" >
                    <div className="card-body">
                        {note.tag && note.tag.length<13 ?<div className="tag">{note.tag}</div>:<div className="tag">{user.name}</div>}
                        {note.title.length > 15?<h5 className="card-title">{note.title.slice(0,30)}... </h5>: <h5 className="card-title">{note.title} </h5>}
                        {note.description.length > 30?<p className="card-text">{note.description.slice(0,30)}...</p>:<p className="card-text">{note.description}</p>}                        <div className="edit">
                        <i className="fa-regular fa-eye mx-2" onClick={()=>{viewNote(note)}}></i>
                        <i className="fa-regular fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}} ></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem;