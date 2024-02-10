import React, { useCallback, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem, TodoItemProps } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: '90%',
});

const endpointGetTodos = 'http://localhost:8080/api/todos/';
const endpointPostTodo = 'http://localhost:8080/api/todos/';

function App() {
  const [todos, setTodos] = useState([]);
  const [todosSuccess, setTodosSuccess] = useState(false);
  
  const getTodos = async () => {
    try {
      // fetch todos if not exist in localStorage
      // if localStorage has no todos
      if(localStorage.getItem('todos') === null) {
        // fetch todos
        const response = await fetch(endpointGetTodos, {mode:'cors'});
        const data = await response.json();
        // setTodos
        setTodos(data);
        // add todos to localStorage
        localStorage.setItem('todos', JSON.stringify(data));
        setTodosSuccess(true);
      } else {
        setTodos(JSON.parse(localStorage.getItem('todos')!));
        setTodosSuccess(true);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const addTodoToAPI = async(todo: TodoItemProps) => {
    try {
      const response = await fetch(endpointPostTodo, {
        mode:'cors',
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Accepts': "application/json",
          'Content-type': 'application/json',
        }
      });
      const data = await response.json();
      // const initialData = localStorage.getItem('todos') || data;
      // setTodos(JSON.parse(initialData))
      setTodos((todo) => [
        data,
        ...todo,
      ]);
      // console.log({ data })
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = useCallback((description: string) => {
    const todo = {
      id: uuidv4(),
      description,
      completed: false,
    };

    addTodoToAPI(todo);
   
  }, [todos]);

  const handleChange = useCallback((checked: boolean, id: string) => {
    // handle the check/uncheck logic
    let sortedTodos = [];
    const updatedTodos = todos.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          completed: checked,
         } 
      }
      return todo;
    });
    const remainingTodos = updatedTodos
      .filter(item => item.id !== id);
    const checkedTodo = updatedTodos
      .filter(todo => todo.id === id);
    const [currentTodo] = checkedTodo;
    if(currentTodo.checked === true) {
      sortedTodos = [...remainingTodos, ...checkedTodo];
    } else {
      sortedTodos = [...checkedTodo, ...remainingTodos];
    }

    setTodos(sortedTodos);
    window.localStorage.setItem('todos', JSON.stringify(sortedTodos));
  }, [todos]);

  const handleClick = useCallback((event: MouseEvent, id: string) => {
    event.preventDefault();
    const remainingTodos = todos.filter(todo => todo.id !== id);
    setTodos(remainingTodos);
    window.localStorage.setItem('todos', JSON.stringify(remainingTodos));
  }, [todos]);

  // If api respond success on update or add todos
  // should update the database
  // and after should persist on local storage


  // If API respond with error status
  // frontend update must be reverted

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todosSuccess && todos?.map((todo, idx) => (
          <TodoItem
            {...todo}
            key={idx}
            onClick={handleClick}
            onChange={handleChange} />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
