import {FormEvent, useState} from 'react'
import {
    useAddTodoMutation,
    useDeleteTodoMutation,
    useGetTodosQuery,
    useUpdateTodoMutation
} from "./feature/api/apiSlice"
import './App.css'

function App() {
    const [todo, setTodo] = useState("")

    const {data: todos, isLoading, isSuccess, isError, error} = useGetTodosQuery()
    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (todo) {
            addTodo({title: todo, completed: false})
            setTodo("")
        }
    };
    let content = <div></div>
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isError) {
        content = <p>{error.toString()}</p>
    } else if (isSuccess) {
        content = (
            <ul>
                {todos.map(todo => {
                    return (
                        <li key={todo.id} className={todo.completed ? " checked" : ""}
                            onClick={() => updateTodo({...todo, completed: !todo.completed})}>
                            {todo.title}
                            <span className="close" onClick={() => deleteTodo(todo.id)}>x</span>
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <div className="App">
            <div className="header">
                <form onSubmit={handleSubmit}>
                    <h2>My To Do List</h2>
                    <input
                        type="text"
                        placeholder="Your Todo"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    <button className="addBtn" type="submit">
                        Add
                    </button>
                </form>
            </div>
            {content}
        </div>
    )
}

export default App
