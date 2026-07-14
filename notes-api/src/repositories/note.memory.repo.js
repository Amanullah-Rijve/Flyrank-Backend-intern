// In-memory store — data survives only until server restarts

import { create } from "node:domain";

const { title } = require("node:process");

let notes = [
    {id: 1, title: "Learn express", done:false},
    { id: 2, title: "Build REST API", done: false },
];
let nextId = 3;

export const memoryRepo = {
    getAll: ()=> notes,

    getById: (id)=> notes.find((n)=>n.id===id),

    create: (title)=>{
        const note = {id: nextId++,title,done:false}
        notes.push(note);
        return note;
    },

    update: (id,fields)=>{
        const note = notes.find((n)=> n.id===id);
        if(!note) return null;
        if (fields.title !== undefined) note.title = fields.title;
        if (fields.done !== undefined) note.done = fields.done;
        return note;
    },

    remove: (id) => {
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) return null;
    return notes.splice(index, 1)[0];
    },
}