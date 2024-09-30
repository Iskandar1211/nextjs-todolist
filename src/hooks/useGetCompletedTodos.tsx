'use client';
import axios from "axios";
import {TodoType} from "@/schemas/todo.schema";
import {useEffect, useState} from "react";


export const useGetComplatedTodos = () => {
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);

  const getCompletedTodos = async () => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/completed-todos`)
      .then(res => setCompletedTodos(res.data))
  }

  useEffect(() => {
    getCompletedTodos()
  }, []);
  return {completedTodos, getCompletedTodos}
};
