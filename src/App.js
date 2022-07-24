import React, { useState, useEffect } from "react";
import "./App.css";
//Importing Components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Functions

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(
          todos.filter((todo) => {
            return todo.completed === true;
          })
        );
        break;

      case "uncompleted":
        setFilteredTodos(
          todos.filter((todo) => {
            return todo.completed === false;
          })
        );
        break;

      default:
        setFilteredTodos(todos);
    }
  };

  //Save To Local

  const saveLocalTodos = () => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  //Use Effect

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    console.log("changes applied succesfully");
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  return (
    <div className="App">
      <header>
        <h1>Rudy's To-do List</h1>
      </header>
      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      ></Form>
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      ></TodoList>
    </div>
  );
}

export default App;
