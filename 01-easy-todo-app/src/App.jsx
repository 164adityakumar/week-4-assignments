import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setInterval(() => {
      axios
        .get("http://localhost:3000/todos")
        .then((response) => {
          console.log(response.data);
          setTodos(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }, []);

  return todos;
}

function useNewTodos() {
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newTodo.trim() !== "") {
      axios
        .post("http://localhost:3000/todos", {
          title: newTodo,
          completed: false,
        })
        .then((response) => {
          console.log(response.data);
          setNewTodo("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return { newTodo, handleInputChange, handleSubmit };
}

function App() {
  const todos = useTodos();
  const { newTodo, handleInputChange, handleSubmit } = useNewTodos();

  return (
    <>
      <div class="todo-app">
        <h1 class="heading">Todo App</h1>
        <TodoForm
          newTodo={newTodo}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
        <br />
        {todos.map((todo) => (
          <Todo newTodos={todo} />
        ))}
      </div>
    </>
  );
}
function TodoForm(props) {
  const { newTodo, handleInputChange, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input type="text" value={newTodo} onChange={handleInputChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
}
function Todo(props) {
  // console.log(props);
  // Add a delete button here so user can delete a TODO.
  return (
    <div>
      <div className="todo">
      {props.newTodos.title}
      </div>
      <button class="delete-btn">Delete</button>
    </div>
  );
}

export default App;
