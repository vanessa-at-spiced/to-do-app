import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import "./todoList.css";

//TYPE defines all but Objects. Often used for union types
type Status = "open" | "done" | "discarded";

//INTERFACE defines Objects
interface ToDo {
    id: number;
    title: string;
    description?: string;
    status: Status;
}

export interface Props {
    user: number;
}

export const App: React.FC<Props> = (props) => {
    const [todoList, setTodoList] = useState<ToDo[]>([]);
    const [title, setTitle] = useState<string>("");

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch(`/api/todos`)
            .then((res) => res.json())
            .then((data) => {
                console.log("first", data);
                setTodoList(data);
            })
            .catch((err) => {
                console.log("err in did mount", err);
            });
    }, []);

    const handleTodo = () => {
        addTodo();
        inputRef.current.value = "";
    };

    async function addTodo() {
        try {
            const res = await fetch("/add/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: title }),
            });
            const data = await res.json();
            console.log("addTodo second", data);
            setTodoList((todoList) => [data, ...todoList]);
            // setTitle("");
        } catch (err) {
            console.log("err in bio upload", err);
        }
    }

    const deleteTodo = (id: number) => {
        console.log("id in delete", id);
        fetch(`/delete/todo/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("item:", data);

                setTodoList((todoList) => {
                    const newArray = todoList.filter((item) => item.id != id);
                    console.log("new", newArray);
                    return newArray;
                });
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
                //    const updatedList: ToDo[] = ;\
                //    console.log("updte", updatedList);
                setTodoList(
                    todoList.map((item) => {
                        if (item.id != id) {
                            return item;
                        } else {
                            return {
                                ...item,
                                status: "done",
                            };
                        }
                    })
                );
            })
            .catch((err) => {
                console.log("/delete/todo/${id} ", err);
            });
    };

    return (
        <>
            <div>
                <div>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        // defaultValue={title}
                        name="text"
                        ref={inputRef}
                    />
                    <Button
                        onClick={() => handleTodo()}
                        label="Add Todo"
                        size="medium"
                        action="add"
                    ></Button>
                </div>
                {todoList &&
                    todoList.map((todo) => (
                        <div
                            key={todo.id}
                            className={
                                "todo-item " +
                                (todo.status == "done" ? "done" : "open")
                            }
                        >
                            <Link to={`/todo/${todo.id}`}>
                                <div className="todo-title">{todo.title}</div>
                            </Link>
                            <Button
                                onClick={() => deleteTodo(todo.id)}
                                label="Delete"
                                size="medium"
                                action="delete"
                            ></Button>

                            {todo.status == "open" && (
                                <Button
                                    onClick={() => updateStatus(todo.id)}
                                    label="Done"
                                    size="medium"
                                    action="done"
                                ></Button>
                            )}
                        </div>
                    ))}
            </div>
        </>
    );
};

export default App;
