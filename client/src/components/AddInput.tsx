import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { AddInputProps } from "../models/AddInput";

const Form = styled.form({
  width: "90%",
  margin: '0 auto',
});

const Input = styled.input({
  width: "100%",
  border: "none",
  padding: 16,
  outline: "none",
  borderRadius: 3,
  marginBottom: 8,
});

export const AddInput: FC<AddInputProps> = ({ onAdd }) => {
  const [input, setInput] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(input);
        setInput("");
      }}
    >
      <Input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        placeholder="Add a new todo item here"
      />
    </Form>
  );
};
