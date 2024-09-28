'use client';
import React from 'react';
import TodoComponent from "@/components/todo.component";
import {useGetTodos} from "@/hooks/useGetTodos";
import {Button} from "@/components/ui/button";
import Modal from "@/components/ui/modal/modal";
import CreateOrUpdateTodoForm from "@/components/forms/create-or-update-todo-form";


const TodolistPageComponent = () => {
  const {todos, getTodos} = useGetTodos()

  return (
    <div className={'border flex gap-2 p-4'}>
      <div className={'flex-1 grid grid-cols-3 gap-2'}>
        {todos.map(todo => <TodoComponent key={todo.id} todo={todo}/>)}
      </div>

      <Modal
        title={'Create Todo'}
        asChildButton={<Button variant={'default'}>Add Todo</Button>}
      >
        <CreateOrUpdateTodoForm getTodos={getTodos}/>
      </Modal>
    </div>
  );
};

export default TodolistPageComponent;