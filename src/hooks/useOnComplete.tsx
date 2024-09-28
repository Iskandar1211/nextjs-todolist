import axios from "axios";
import {TodoType} from "@/schemas/todo.schema";
import {useState} from "react";

const useOnComplete = () => {
  const [isCompleted, setIsCompleted] = useState(false);

  const onComplete = (updateTodo: TodoType) => {
    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todos/${updateTodo.id}`, updateTodo)
      .then(async (data) => data.status === 200 && setIsCompleted(true)
      )
  }
  return {onComplete, isCompleted}
};

export default useOnComplete;