import { count } from "node:console";
import {pgRepo as repo} from "../repositories/note.pg.repo.js";

// GET notes
export const getAllNotes = async (req,res,next)=>{
    try {
        const notes = await repo.getAll();
        res.json({
            success: true,
            count: notes.lenght,
            data: notes
        })
    } catch (error) {
        next(error);
    }
};

/ POST /notes
export const createNote = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "title is required" });
    }
    const note = await repo.create(title);
    res.status(201).json({ success: true, message: "Note created", data: note });
  } catch (error) {
    next(error);
  }
};

// PATCH /notes/:id
export const updateNote = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const note = await repo.update(id, req.body);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.json({ success: true, message: "Note updated", data: note });
  } catch (error) {
    next(error);
  }
};

// DELETE /notes/:id
export const deleteNote = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const note = await repo.remove(id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }
    res.json({ success: true, message: "Note deleted", data: note });
  } catch (error) {
    next(error);
  }
};