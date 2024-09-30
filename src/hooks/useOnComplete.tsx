import axios from "axios";
import {TodoType} from "@/schemas/todo.schema";
import {useGetTodos} from "@/hooks/useGetTodos";

const useOnComplete = () => {

  const {getTodos} = useGetTodos()

  const onComplete = (updateTodo: TodoType) => {
    axios.put(`${process.env.NEXT_PUBLIC_API_URL}/todos/${updateTodo.id}`, updateTodo)
      .then(async (data) => {
          if (data.status === 200) {
             getTodos()
          }
        }
      )
  }
  return {onComplete}
};

export default useOnComplete;