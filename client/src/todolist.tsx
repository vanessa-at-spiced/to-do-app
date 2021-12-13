import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
// import { TodoItem } from "./todoItem";

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
export interface Input {
    text?: string;
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
            setTodoList((todoList) => [...todoList, data]);
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

    return (
        <>
            <div>
                {todoList &&
                    todoList.map((todo) => (
                        <div key={todo.id}>
                            <Link to={`/todo/${todo.id}`}>
                                <h3>{todo.title}</h3>
                            </Link>

                            <button onClick={() => deleteTodo(todo.id)}>
                                Delete
                            </button>
                            <button>done</button>
                        </div>
                    ))}

                <div>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        // defaultValue={title}
                        name="text"
                        ref={inputRef}
                    />
                    <button onClick={() => handleTodo()}>Add Todo</button>
                </div>
            </div>
        </>
    );
};

export default App;
