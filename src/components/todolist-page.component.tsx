'use client';
import React from 'react';
import TodoComponent from "@/components/todo.component";
import {useGetTodos} from "@/hooks/useGetTodos";

import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TodoSchema, TodoType} from "@/schemas/todo.schema";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import axios from "axios";


const TodolistPageComponent = () => {
  const {todos, getTodos} = useGetTodos()

  const form = useForm<TodoType>({
    defaultValues: {
      completed: false
    },
    resolver: zodResolver(TodoSchema)
  })
  console.log("form", form.watch())
  const onSubmit = (data: TodoType) => {
    const newTodo: TodoType = {...data, id: crypto.randomUUID(), userId: crypto.randomUUID()};
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/todos`, newTodo)
      .then(async (data) => data.status === 201 && await getTodos()
      )
    form.setValue('title','')
  }

  return (
    <div>
      {todos.map(todo => <div key={todo.id}>
        <p>{todo.title}</p>
        <div>
          {todo.completed}
        </div>
      </div>)}
      <div className={'w-1/3'}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-5">
            <div className={'flex gap-4 items-center'}>
              <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({field}) => (
                  <FormItem className="flex flex-col items-center">
                    <Label className={'text-sm'}>Completed</Label>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <TodoComponent/>
    </div>
  );
};

export default TodolistPageComponent;