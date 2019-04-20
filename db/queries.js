import pool from './config';

const getUsers = async (request, response) => {
  const text = 'SELECT * FROM users ORDER BY id ASC';
  try {
    const res = await pool.query(text);
    console.log('ssss', res.rows);
    response.status(200).json(res.rows);
  } catch(err) {
    throw err.stack
  }
}

const getUserById = async (request, response) => {
  const id = parseInt(request.params.id)
  const text = 'SELECT * FROM users WHERE id = $1';
  const value = [id];

  try {
    const res = await pool.query(text, value);
    console.log('ppp', res.rows);
    response.status(200).json(res.rows);
  } catch(err) {
    throw err.stack
  }
}

const createUser = async (request, response) => {
  const { 
    name,
    code,
    profession,
    color,
    city,
    branch,
    assigned 
  } = request.body

  const text = 'INSERT INTO users (name, code, profession, color, city, branch, assigned) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const values = [name, code, profession, color, city, branch, assigned];
  try {
    const res = await pool.query(text, values);
    response.status(201).send(res.rows[0]);
  } catch(err) {
    throw err.stack
  }
}

const updateUser = async(request, response) => {
  const id = parseInt(request.params.id)
  const { 
    name,
    code,
    profession,
    color,
    city,
    branch,
    assigned 
  } = request.body

  const text = 'UPDATE users SET name = $1, code = $2, profession = $3, color = $4, city = $5, branch = $6, assigned = $7 WHERE id = $8 RETURNING *';
  const values = [name, code, profession, color, city, branch, assigned, id];
  try {
    const res = await pool.query(text, values);
    response.status(200).send(res.rows[0]);
  } catch(err) {
    throw err.stack
  }
}

const deleteUser = async (request, response) => {
  const id = parseInt(request.params.id)
  const text = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const value = [id]

  try {
    const res = await pool.query(text, value);
    response.status(200).send(res.rows[0]);
  } catch(err) {
    throw err.stack
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}