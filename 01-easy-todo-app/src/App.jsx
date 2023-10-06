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
  const [newTodoDescription, setNewTodoDescription] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleInputChangedesc = (event) => {
    setNewTodoDescription(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (newTodo.trim() !== "") {
      axios
        .post("http://localhost:3000/todos", {
          title: newTodo,
          description: newTodoDescription,
          completed: false,
        })
        .then((response) => {
          console.log(response.data);
          setNewTodo("");
          setNewTodoDescription("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return {
    newTodo,
    newTodoDescription,
    handleInputChange,
    handleInputChangedesc,
    handleSubmit,
  };
}

function App() {
  const todos = useTodos();
  const {
    newTodo,
    newTodoDescription,
    handleInputChange,
    handleInputChangedesc,
    handleSubmit,
  } = useNewTodos();

  return (
    <>
      <div class="todo-app">
        <h1 class="heading">Keep Notes &#128392;</h1>
        <br />
        <TodoForm
          newTodo={newTodo}
          newTodoDescription={newTodoDescription}
          handleInputChange={handleInputChange}
          handleInputChangedesc={handleInputChangedesc}
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
  const {
    newTodo,
    newTodoDescription,
    handleInputChange,
    handleInputChangedesc,
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Todo"
      />
      <input
        type="text"
        value={newTodoDescription}
        onChange={handleInputChangedesc}
        placeholder="Description"
      />

      <button type="submit">Add Todo</button>
    </form>
  );
}
function Todo(props) {
  // console.log(props);
  // Add a delete button here so user can delete a TODO.

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/todos/${props.newTodos.id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="todo">
      <div className="todo-container">
        <h3>{props.newTodos.title}</h3>
        <p>{props.newTodos.description}</p>
        <button class="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default App;
