'use client';
import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {TodoSchema, TodoType} from "@/schemas/todo.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {DialogClose} from "@/components/ui/dialog";
import {useGetTodos} from "@/hooks/useGetTodos";

const CreateOrUpdateTodoForm = ({todo}: { todo?: TodoType }) => {
  const {getTodos} = useGetTodos()

  const form = useForm<TodoType>({
    defaultValues: {
      completed: false
    },
    resolver: zodResolver(TodoSchema)
  })

  useEffect(() => {
    if (!todo) return
    form.setValue('start', todo.start)
    form.setValue('dateFrom', todo.dateFrom)
    form.setValue('end', todo.end)
    form.setValue('id', todo.id)
    form.setValue('title', todo.title)
    form.setValue('completed', todo.completed)
    if (todo.userId) {
      form.setValue('userId', todo.userId)
    }
    if (todo.description) {
      form.setValue('description', todo.description)
    }
  }, [todo]);

  const onSubmit = (data: TodoType) => {
    if (todo?.id) {
      const updateTodo: TodoType = {...data, id: todo.id, userId: todo.id};
      axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todo.id}`, updateTodo)
        .then(async (data) => data.status === 200 && await getTodos()
        )
    } else {
      const newTodo: TodoType = {...data, id: crypto.randomUUID(), userId: crypto.randomUUID()};
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/todos`, newTodo)
        .then(async (data) => data.status === 201 && await getTodos()
        )
    }

    form.setValue('title', '')
  }
  return (
    <div className={'w-full'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-5">
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
            name="dateFrom"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input type={'date'} placeholder="date from" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <div className={'flex gap-3'}>
            <FormField
              control={form.control}
              name="start"
              render={({field}) => (
                <FormItem className={'flex items-center gap-4'}>
                  <Label className={'font-bold'}>From</Label>
                  <FormControl>
                    <Input type={'time'} placeholder="date from" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end"
              render={({field}) => (
                <FormItem className={'flex items-center gap-4'}>
                  <Label className={'font-bold'}>To</Label>
                  <FormControl>
                    <Input type={'time'} placeholder="date from" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <DialogClose asChild>
            <Button type="submit">Submit</Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};

export default CreateOrUpdateTodoForm;