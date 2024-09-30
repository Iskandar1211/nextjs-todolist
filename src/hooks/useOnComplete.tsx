import axios from "axios";
import {TodoType} from "@/schemas/todo.schema";


const useOnComplete = (getTodos: () => Promise<void>, getCompletedTodos: () => Promise<void>) => {
  const onComplete = async (updateTodo: TodoType) => {
    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todos/${updateTodo.id}`, updateTodo)
      .then(async (data) => {
          if (data.status === 200) {
            await getTodos()
            await getCompletedTodos()
          }
        }
      )
  }

  return {onComplete}

};

export default useOnComplete;