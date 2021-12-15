import React from "react";
import "./todoItem.css";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";

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
                <div>
                    <Link to={`/todos`}>
                        <Button
                            label="Back to List"
                            size="medium"
                            action="back-to-list"
                        ></Button>
                    </Link>
                    <div className="todo-item" key={todoItem.id}>
                        <h3>{todoItem.title}</h3>
                        {/* <p>{todoItem.description}</p> */}

                        {!editorIsVisible && (
                            <div className="container__description">
                                <p className="description">
                                    {todoItem.description}
                                </p>
                            </div>
                        )}
                        {editorIsVisible && (
                            <div className="todoEditor">
                                <input
                                    type="text"
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ): void => changeDraftTodo(e)}
                                    defaultValue={todoItem.description}
                                />
                            </div>
                        )}

                        {/* <div className="dist"></div> */}

                        {!editorIsVisible && todoItem.description && (
                            <Button
                                onClick={() => toggleArea()}
                                label="Edit description"
                                size="medium"
                                action="description-edit"
                            ></Button>
                        )}

                        {!editorIsVisible && !todoItem.description && (
                            <Button
                                onClick={() => toggleArea()}
                                label="Add description"
                                size="medium"
                                action="description-add"
                            ></Button>
                        )}

                        {editorIsVisible && (
                            <Button
                                onClick={() => upload()}
                                label="Save"
                                size="medium"
                                action="save"
                            ></Button>
                        )}
                        <Button
                            onClick={() => deleteTodo(todoItem.id)}
                            label="Delete"
                            size="medium"
                            action="delete"
                        ></Button>

                        {todoItem.status == "open" && (
                            <Button
                                onClick={() => updateStatus(todoItem.id)}
                                label="Done"
                                size="medium"
                                action="done"
                            ></Button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default TodoItem;
