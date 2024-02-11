import React, { useCallback, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import styled from "@emotion/styled";
import { 
  AddInput,
  Header,
  SubTitle,
  TodoItem,
  TodoList
} from "./components";
import { deleteTodo, getAllTodos, postTodo } from "./api/todos";
import { TodoItemProps } from "./models/TodoItem";
import { updateAndSortTodos } from "./utils/todos";

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
        data.length && localStorage.setItem('todos', JSON.stringify(data));
        setTodosSuccess(true);
      } else {
        // Set todos from local Storage
        setTodos(JSON.parse(localStorage.getItem('todos')!));
        setTodosSuccess(true);
      }
    }
    catch (error) {
      setTodosSuccess(false);
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

  const handleChange = useCallback((completed: boolean, id: string) => {
    const sortedTodos = updateAndSortTodos(todos, id, completed);

    setTodos(sortedTodos);
    localStorage.setItem('todos', JSON.stringify(sortedTodos));
  }, [todos]);

  // TODO - Add logic to edit todo
  const handleEditTodo = (event, id) => {
    console.log(event);
  };

  const handleRemoveTodo = useCallback((event: MouseEvent, id: string) => {
    event.preventDefault();
    removeTodo(id);
  }, [todos]);

  // TODO - Show notification of removed todo
  const removeTodo = async(id: string) => {
    const remainingTodos = todos.filter(todo => todo.id !== id);
    const currentTodo = todos.filter(todo => todo.id === id)[0];
    try {
      const response = await deleteTodo(currentTodo);
      const data = response?.data;
      console.log(data);
      alert(data.message);
      // setTodos
      setTodos(remainingTodos);
      localStorage.setItem('todos', JSON.stringify(remainingTodos));
  
      setTodosSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }

  // TODO - If API respond with error status frontend update must be reverted
  
  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      {/* {deleteTodoMessage?.length > 0 && showDeleteTodoMessage()} */}
      {!todosSuccess && <SubTitle>Sorry we have an error fetching Todos</SubTitle>}
      {/* {noTodos && <SubTitle>You dont have todos to show</SubTitle>} */}
      <TodoList>
        {todosSuccess && todos?.map((todo, idx) => (
          <TodoItem
            {...todo}
            key={idx}
            onEditTodo={handleEditTodo}
            onRemoveTodo={handleRemoveTodo}
            onChange={handleChange} />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
