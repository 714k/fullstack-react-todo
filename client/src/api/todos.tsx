import axios from "axios";

import { TodoItemProps } from "../models/TodoItem";
import { 
  URL_ENDPOINT_GET_TODOS,
  URL_ENDPOINT_POST_TODO,
  URL_ENDPOINT_DELETE_TODO
} from "../constants";

export const getAllTodos = async () => {
  return axios
    .get(URL_ENDPOINT_GET_TODOS)
    .then(response => response)
    .catch(error => console.log('Can get todos', error));
};  

export const postTodo = (todo: TodoItemProps) => {
  return axios
    .post(URL_ENDPOINT_POST_TODO, todo)
    .then(response => response)
    .catch(error => console.log('Can create the todo', error));
}

export const deleteTodo = (todo: TodoItemProps) => {
  const { id, description } = todo;
  return axios
    .delete(`${URL_ENDPOINT_DELETE_TODO}${id}`, {data: description})
    .then(response => response)
    .catch(error => error);
}



