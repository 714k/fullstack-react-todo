export interface TodoItemProps {
  id: string;
  description: string;
  completed?: boolean;
  onChange?: (checked: boolean, id: string) => void;
  onEditTodo?: (event: MouseEvent, id: string) => void;
  onRemoveTodo?: (event: MouseEvent, id: string) => void;
}
