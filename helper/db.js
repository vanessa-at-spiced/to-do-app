const spicedPg = require("spiced-pg");

const dbUsername = "postgres";
const dbUserPassword = "postgres";
const database = "todo";

const db = spicedPg(process.env.DATABASE_URL || `postgres:${dbUsername}:${dbUserPassword}@localhost:5432/${database}`);

console.log("[db] Connecting to ", database);


// ----------------------ADD------------------------------------------------
module.exports.addUser = (first, last, email, password) => {
    const q = `INSERT INTO users (first,last,email,password) VALUES($1,$2,$3,$4) RETURNING id`;
    const params = [first, last, email, password];
    return db.query(q, params);
};
module.exports.addTodo = (user_id, title) => {
    const q = `INSERT INTO items (user_id, title) VALUES($1,$2) RETURNING title, description, status, id`;
    const params = [user_id, title];
    return db.query(q, params);
};


module.exports.deleteTodo = (id) => {
    const q = `DELETE FROM items WHERE items.id = $1`;
    const params = [id];
    return db.query(q, params);
};


// ---------------------UPDATE------------------------------------------------
module.exports.updateTodo = (item_id, description) => {
    const q = `UPDATE items SET description = $2 WHERE items.id = $1 RETURNING items.description`;
    const params = [item_id, description];
    return db.query(q, params);
};

// ---------------------Check------------------------------------------------
module.exports.checkEmail = (email) => {
    const q = `SELECT * FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};




// ---------------------GET--------------------------------------------------


module.exports.getPassword = (email) => {
    const q = `SELECT password  FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getUserId = (email) => {
    const q = `SELECT id  FROM users WHERE email = $1`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getTodos = (id) => {
    const q = `SELECT id, title, status  FROM items WHERE user_id = $1`;
    const params = [id];
    return db.query(q, params);
};


module.exports.getTodoItem = (id) => {
    const q = `SELECT title, description, created_at, status FROM items WHERE id = $1`;
    const params = [id];
    return db.query(q, params);
};


