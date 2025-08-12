const db = require('../utils/db');
const bcrypt = require('bcryptjs');

const Teacher = {
  async create(teacher) {
    const hashedPassword = await bcrypt.hash(teacher.password, 10);
    const [result] = await db.execute(
      `INSERT INTO teachers (full_name, email, subject, phone, bio, password, profile_picture, role, classes_assigned) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        teacher.full_name,
        teacher.email,
        teacher.subject,
        teacher.phone,
        teacher.bio,
        hashedPassword,
        teacher.profile_picture || null,
        teacher.role || 'teacher',
        teacher.classes_assigned || null
      ]
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM teachers WHERE email = ?', [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM teachers WHERE id = ?', [id]);
    return rows[0];
  },

  async getAll() {
    const [rows] = await db.execute('SELECT * FROM teachers');
    return rows;
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    for (const key in data) {
      if (key !== 'password') {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    }
    if (fields.length === 0) return false;
    values.push(id);
    const [result] = await db.execute(
      `UPDATE teachers SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  },

  async updatePassword(id, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'UPDATE teachers SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await db.execute('DELETE FROM teachers WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = Teacher;
