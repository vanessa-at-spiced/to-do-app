const express = require("express");


const db = require("../../helper/db.js");

const router = express.Router();


router.get('/api/todos', function (req, res) {

    const user_id = req.session.userId;

    db.getTodos(user_id).then((result) => {
        console.log("rows /api/todos", result.rows);

        return res.json(result.rows);

    }).catch((err) => {
        console.log(err);
        return res.status(err.status || 500).send({
            error: {
                status: err.status || 500,
                // message: err.message || "Internal Server Error",
            },
        });
    });
});


router.get("/api/todo/:id", (req, res) => {
    const id = req.params.id;


    db.getTodoItem(id)
        .then(({ rows }) => {
            console.log("getTodoItem", rows);
            return res.json(rows[0]);
        }).catch((err) => {
            console.log(err);
            return res.status(err.status || 500).send({
                error: {
                    status: err.status || 500,
                    // message: err.message || "Internal Server Error",
                },
            });
        });
});




router.post('/add/todo', async (req, res) => {

    const title = req.body.title;
    const user_id = req.session.userId;


    try {
        const { rows } = await db.addTodo(user_id, title);
        res.json(rows[0]);
    } catch (err) { console.log("error in addBio", err); }


});
router.post('/update/description', async (req, res) => {

    const description = req.body.description;
    const item_id = req.body.todoItemId;
    console.log("update description", description, item_id)

    try {
        const { rows } = await db.updateTodo(item_id, description);
        res.json(rows[0]);
    } catch (err) { console.log("error in addBio", err); }


});


router.get("/delete/todo/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const { rows } = await db.deleteTodo(id);
        console.log("deleted", rows);
        res.json(rows);
    } catch (err) { console.log("/todo/delete/:id", err); }


});


module.exports.todosRouter = router;


