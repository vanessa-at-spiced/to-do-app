import React from "react";
import "./todoItem.css";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { Container, Form, Row, Col } from "react-bootstrap";

//TYPE defines all but Objects. Often used for union types
type Status = "open" | "done" | "discarded";

//INTERFACE defines Objects
interface ToDo {
    id: number;
    title: string;
    description?: string;
    status: Status;
}

type TodoId = {
    id: string;
};
//TData "Generics" until now it is not sure, what kind of data will come. For this we have the TData placeholder

export const TodoItem: React.FC = () => {
    const { id } = useParams<TodoId>();
    const history = useHistory();

    const [todoItem, setTodoItem] = useState<ToDo>(null);
    const [draftTodo, setDraftTodo] = useState("");
    const [editorIsVisible, setEditorIsVisible] = useState(false);

    useEffect(() => {
        fetch(`/api/todo/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("item:", data);
                setTodoItem(data);
            })
            .catch((err) => {
                console.log("/api/todo/${id} ", err);
            });
    }, []);

    function toggleArea() {
        setEditorIsVisible(!editorIsVisible);
    }

    async function upload() {
        try {
            const res = await fetch("/update/description", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: draftTodo,
                    todoItemId: id,
                }),
            });
            const data = await res.json();
            console.log("updateProfileBio(data.description)", data);

            setDraftTodo(data.description);

            setTodoItem((todoItem) => ({
                ...todoItem,
                description: data.description,
            }));

            toggleArea();
        } catch (err) {
            console.log("err in bio upload", err);
            // setError(true);
        }
    }

    const changeDraftTodo = (e: React.SyntheticEvent<EventTarget>) => {
        return setDraftTodo((e.target as HTMLInputElement).value);
    };

    const deleteTodo = (id: number) => {
        console.log("id in delete", id);
        fetch(`/delete/todo/${id}`)
            .then((res) => res.json())
            .then(() => {
                // console.log("item:", data);

                history.push("/");
            })
            .catch((err) => {
                console.log("/delete/todo/${id} ", err);
            });
    };

    const updateStatus = (id: number) => {
        fetch(`/update/status/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("item:", data);

                setTodoItem((todoItem) => ({
                    ...todoItem,
                    status: "done",
                }));
            })
            .catch((err) => {
                console.log("/update/status/${id} ", err);
            });
    };

    return (
        <>
            {todoItem && (
                <Container>
                    <Row className="mt-5">
                        <Col md={6}>
                            <Link className="mt-5" to={`/todos`}>
                                <Button
                                    label="Back to List"
                                    size="medium"
                                    action="back-to-list"
                                ></Button>
                            </Link>
                        </Col>
                    </Row>

                    <div className="todo-item-detail" key={todoItem.id}>
                        <Row className="mt-5">
                            <Col md={6}>
                                <div className="todo-title-detail">
                                    {todoItem.title} :
                                </div>
                                {/* <p>{todoItem.description}</p> */}

                                {!editorIsVisible && (
                                    <div className="container__description">
                                        <p className="description-detail">
                                            {todoItem.description}
                                        </p>
                                    </div>
                                )}
                                {editorIsVisible && (
                                    <div className="todoEditor">
                                        <Form.Group
                                            className="mb-3"
                                            controlId="exampleForm.ControlTextarea1"
                                        >
                                            <Form.Control
                                                className="board"
                                                as="textarea"
                                                rows={5}
                                                cols={33}
                                                onChange={(
                                                    e: React.ChangeEvent<HTMLInputElement>
                                                ): void => changeDraftTodo(e)}
                                                defaultValue={
                                                    todoItem.description
                                                }
                                            />
                                        </Form.Group>
                                    </div>
                                )}
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md={6}>
                                {!editorIsVisible && todoItem.description && (
                                    <Button
                                        onClick={() => toggleArea()}
                                        label="Edit description"
                                        size="medium"
                                        action="description"
                                    ></Button>
                                )}

                                {!editorIsVisible && !todoItem.description && (
                                    <Button
                                        onClick={() => toggleArea()}
                                        label="Add description"
                                        size="medium"
                                        action="description"
                                    ></Button>
                                )}

                                {editorIsVisible && (
                                    <Button
                                        onClick={() => upload()}
                                        label="Save"
                                        size="medium"
                                        action="description"
                                    ></Button>
                                )}
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col md={6}>
                                <Button
                                    onClick={() => deleteTodo(todoItem.id)}
                                    label="Delete"
                                    size="medium"
                                    action="delete"
                                ></Button>

                                {todoItem.status == "open" && (
                                    <Button
                                        onClick={() =>
                                            updateStatus(todoItem.id)
                                        }
                                        label="Done"
                                        size="medium"
                                        action="done"
                                    ></Button>
                                )}
                            </Col>
                        </Row>
                    </div>
                </Container>
            )}
        </>
    );
};

export default TodoItem;
