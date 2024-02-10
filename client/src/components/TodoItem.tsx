import React, { FC, useState } from "react";
import styled from "@emotion/styled";

export const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  // justifyContent: "space-between",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
});

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  padding: 10,
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
  color: "grey",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});

const Button = styled.button`
   margin-left: auto;
   width: auto;
   margin-top: 0;
   margin-bottom: 0;
   height: 40px;
   background-color: red;
   color: white;
   &:hover {
    background-color: black;
   }
`;

export interface TodoItemProps {
  id: string;
  description: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onClick?: (event: MouseEvent) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  id,
  description,
  checked = false,
  onChange,
  onClick,
}) => {
  const [showCloseButton, setShowCloseButton] = useState(false);

  return (
    <Wrapper
      onMouseOver={() => setShowCloseButton(true)}
      onMouseOut={() => setShowCloseButton(false)}
    >
      <Checkbox
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked, id)}
      />
      <Label checked={checked}>{description}</Label>
      {showCloseButton && (
        <Button 
          onClick={(e) => onClick(e, id)}>Remove</Button>
      )}
    </Wrapper>
  );
};
