import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { TodoItemProps } from "../models/TodoItem";

export const Wrapper = styled.label<{checked: boolean}>(({ checked }) => ({
  display: "flex",
  alignItems: "center",
  // justifyContent: "space-between",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: checked ? "#266f00" : "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
}));

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  color: checked ? "white" : "grey",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  padding: 10,
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});

const ButtonsWrapper = styled.span`
  display: flex-inline;
  margin-left: auto;
`;

const Button = styled.button`
   margin-left: auto;
   width: auto;
   margin-top: 0;
   margin-bottom: 0;
   margin-right: 16px;
   height: 40px;
   background-color: grey;
   color: white;
   border: none;
   border-radius: 8px;
   &:hover {
    background-color: red;
   }
`;

export const TodoItem: FC<TodoItemProps> = ({
  id,
  description,
  completed = false,
  onChange,
  onEditTodo,
  onRemoveTodo,
}) => {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <Wrapper
      checked={completed}
      onMouseOver={() => {setShowButtons(true)}}
      onMouseOut={() => setShowButtons(false)}
    >
      <Checkbox
        type="checkbox"
        id={id}
        checked={completed}
        onChange={(e) => onChange(e.target.checked, id)}
      />
      <Label checked={completed}>{description}</Label>
      {showButtons && (
        <ButtonsWrapper>
        <Button 
          onClick={(e) => onEditTodo(e, id)}>
            Edit
        </Button>
        <Button 
          onClick={(e) => onRemoveTodo(e, id)}>
            Remove
        </Button>
        </ButtonsWrapper>
      )}
    </Wrapper>
  );
};
