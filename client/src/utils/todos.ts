import { TodoItemProps } from "../models/TodoItem";

export const updateAndSortTodos = (todos: TodoItemProps[], id: string, completed: boolean) => {
  // handle the check/uncheck logic
  // if checked
  // we need to switch input state (checked/uncheked)
  // cross the todo
  // and move the checked to the end on the todos

  let sortedTodos = [];

  // includes the status completed/uncompleted
  const updatedTodos = todos.map((todo: TodoItemProps) => {
    if(todo.id === id) {
      return {
        ...todo,
        completed,
       } 
    }
    return todo;
  });

  const remainingTodos = updatedTodos.filter(item => item.id !== id);
  const completedTodo = updatedTodos.filter(todo => todo.id === id);
  const [currentTodo] = completedTodo;

  if(currentTodo.completed === true) {
    sortedTodos = [...remainingTodos, ...completedTodo];
  } else {
    sortedTodos = [...completedTodo, ...remainingTodos];
  }

  return sortedTodos;
};
