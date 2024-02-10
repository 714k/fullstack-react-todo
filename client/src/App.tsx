import React, { useCallback, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "@emotion/styled";
import { 
  AddInput,
  Header,
  TodoItem,
  TodoList
} from "./components";
import { getAllTodos, postTodo } from "./api/todos";
import { error } from "console";
import { TodoItemProps } from "./models/TodoItem";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: '90%',
});

function App() {
  const [todos, setTodos] = useState([]);
  const [todosSuccess, setTodosSuccess] = useState(false);
  
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      // fetch todos if not exist in localStorage
      // if localStorage has no todos
      if(localStorage.getItem('todos') === null) {
        // fetch todos
        const response = await getAllTodos();
        const data = response?.data;
        // setTodos
        setTodos(data);
        // add todos to localStorage
        localStorage.setItem('todos', JSON.stringify(data));
        setTodosSuccess(true);
      } else {
        // Set todos from local Storage
        setTodos(JSON.parse(localStorage.getItem('todos')!));
        setTodosSuccess(true);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const addTodo = useCallback((description: string) => {
    const todo = {
      id: uuidv4(),
      description,
      completed: false,
    };

    createTodo(todo);
    
  }, [todos]);

  const createTodo = async (todo: TodoItemProps) => {
    try {
      const response = await postTodo(todo);
      const data = response?.data;
      // setTodos
      setTodos((todo) => [
        data,
        ...todo,
      ]);
      // add todos to localStorage
      localStorage.setItem('todos', JSON.stringify([...todos, data]));
      setTodosSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

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
