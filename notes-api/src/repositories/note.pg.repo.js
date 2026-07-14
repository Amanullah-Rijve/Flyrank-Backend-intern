import pool from "../config/db.js";

export const pgRepo = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM notes ORDER BY id ASC");
    return result.rows;
  },

  getById: async (id) => {
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  create: async (title) => {
    const result = await pool.query(
      "INSERT INTO notes (title, done) VALUES ($1, $2) RETURNING *",
      [title, false]
    );
    return result.rows[0];
  },

  update: async (id, fields) => {
    const current = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
    if (!current.rows[0]) return null;

    const title = fields.title ?? current.rows[0].title;
    const done  = fields.done  ?? current.rows[0].done;

    const result = await pool.query(
      "UPDATE notes SET title = $1, done = $2 WHERE id = $3 RETURNING *",
      [title, done, id]
    );
    return result.rows[0];
  },

  remove: async (id) => {
    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0] || null;
  },
};