'use client';
import axios from "axios";
import {TodoType} from "@/schemas/todo.schema";
import {useEffect, useState} from "react";


export const useGetTodoById = (id?: string) => {
  const [todoById, setTodo] = useState<TodoType | null>(null);

  const getTodo = async (id: string) => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`)
      .then(res => setTodo(res.data))
  }

  useEffect(() => {
    if(!id) return
    getTodo(id)
  }, []);
  return {todoById, getTodo}
};
