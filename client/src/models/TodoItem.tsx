export interface TodoItemProps {
  id: string;
  description: string;
  checked?: boolean;
  onChange?: (checked: boolean, id: string) => void;
  onClick?: (event: MouseEvent, id: string) => void;
}
