import express from "express";

const app = express();
const PORT = 3000;

// In-memory data store — server restart dile ure jabe
let notes = [
    { id: 1, title: "Learn Express", done: false },
    { id: 2, title: "Build REST API", done: false },
];

let nextId = 3; // auto increment id

// home path
app.get("/", (req, res) => {
res.json({
    message: "Notes API is running" 
});
});

// GET /notes
app.get("/notes", (req, res) => {
res.json({ 
    success: true,
    count: notes.length,
    data: notes
    });
});

// POST /notes
app.post("/notes",(req,res)=>{
    const {title} = req.body;

    if(!title){
        return res.status(400).json({
        success:false,
        message:"tittle requird"
        })
    }
    const newNote = {id: nextId++,title,done:false}
    notes.push(newNote)

    res.status(201).json({
        success: true,
        message:"Note Created",
        data: newNote
    })
})

// PATCH /notes/:id
app.patch("/notes/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const {title, done} = req.body

    const note = notes.find((n)=> n.id===id)

    if(!note){
        return res.status(404).json({
            success: false,
            message: "note not found"
        })
    }
    if(title !== undefined) note.title = title
    if(done !== undefined) note.done = done

    res.json({
        success: true,
        message: "note updated",
        data: note
    })
})

  // DELETE /notes/:id
app.delete("notes/:id",(req,res)=>{
    const id = parseInt(req.query.id)
    const index = notes.findIndex((n)=> n.id ===id)

    if(index ===-1){
        return res.status(404).json({
            success: false,
            message: "Note not found"
        })
    }
    const deleted = notes.splice(index,1)

    res.json({ 
        success: true, 
        message: "Note deleted",
        data: deleted[0]
    });
})

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});