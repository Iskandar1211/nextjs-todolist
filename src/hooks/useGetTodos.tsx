'use client';
import axios from "axios";
import {TodoType} from "@/schemas/todo.schema";
import {useEffect, useState} from "react";


export const useGetTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const getTodos = async () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/todos`)
      .then(res => setTodos(res.data))
  }

  useEffect(() => {
    getTodos()
  }, []);
  return {todos, getTodos}
};
