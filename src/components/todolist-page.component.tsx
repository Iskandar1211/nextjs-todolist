'use client';
import React from 'react';
import TodoComponent from "@/components/todo.component";
import {useGetTodos} from "@/hooks/useGetTodos";
import {Button} from "@/components/ui/button";
import Modal from "@/components/ui/modal/modal";
import CreateOrUpdateTodoForm from "@/components/forms/create-or-update-todo.form";
import {useGetComplatedTodos} from "@/hooks/useGetCompletedTodos";
import useOnComplete from "@/hooks/useOnComplete";

const TodolistPageComponent = () => {
  const {todos, getTodos} = useGetTodos()
  const {completedTodos, getCompletedTodos} = useGetComplatedTodos()
  const {onComplete} = useOnComplete(getTodos, getCompletedTodos)

  return (
    <div className={'border flex gap-2 p-4'}>
      <div>
        <div className={'flex-1 grid grid-cols-3 gap-2'}>
          <h1 className={'col-span-3 my-4'}>Tasks</h1>
          {todos.map(todo => <TodoComponent key={todo.id} todo={todo} refetch={getTodos} onComplete={onComplete}/>)}
        </div>
        <div className={'flex-1 grid grid-cols-3 gap-2'}>
          <h1 className={'col-span-3 my-4'}>Completed Tasks</h1>
          {completedTodos.map(completedTodo => (
            <TodoComponent key={completedTodo.id} todo={completedTodo} isCompleted={true} refetch={getCompletedTodos}/>
          ))}
        </div>
      </div>

      <Modal
        title={'Create Todo'}
        asChildButton={<Button variant={'default'}>Add Todo</Button>}
      >
        <CreateOrUpdateTodoForm refetch={getTodos}/>
      </Modal>
    </div>
  );
};

export default TodolistPageComponent;