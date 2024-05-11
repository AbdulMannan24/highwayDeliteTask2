function Note({ NoteId, title, content}) {
    return (
        <div>
            <h3>{title}</h3>
            <br />
            <p>{content}</p>
            <button id= {NoteId}>view</button>
            <button id= {NoteId}>Edit</button>
            <button id = {NoteId}>Delete</button>
        </div>
    )
}