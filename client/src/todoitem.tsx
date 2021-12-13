import { useState, useEffect } from "react";
import { useParams } from "react-router";

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

    return (
        <>
            {todoItem && (
                <div key={todoItem.id}>
                    <h3>{todoItem.title}</h3>
                    {/* <p>{todoItem.description}</p> */}

                    {!editorIsVisible && (
                        <div className="container__bio">
                            <p>{todoItem.description}</p>
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
                        <button onClick={() => toggleArea()}>Edit todo</button>
                    )}

                    {!editorIsVisible && !todoItem.description && (
                        <button onClick={() => toggleArea()}>Add todo</button>
                    )}

                    {editorIsVisible && (
                        <button onClick={() => upload()}>Save</button>
                    )}
                    <button>delet</button>
                    <button>done</button>
                </div>
            )}
        </>
    );
};

export default TodoItem;
