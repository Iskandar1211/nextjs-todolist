import React from 'react';
import {TodoType} from "@/schemas/todo.schema";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useTimer} from "react-timer-hook";
import Modal from "@/components/ui/modal/modal";
import CreateOrUpdateTodoForm from "@/components/forms/create-or-update-todo.form";
import axios from "axios";
import {toast} from "react-toastify";

const TodoComponent = (
  {
    todo,
    isCompleted,
    refetch,
    onComplete
  }: {
    todo: TodoType,
    isCompleted?: boolean,
    refetch: () => Promise<void>
    onComplete?: (updateTodo: TodoType) => Promise<boolean>
  }) => {
  // ---------------------------------------------------------------------------------------
  // Variables
  // ---------------------------------------------------------------------------------------
  // const startTime = new Date(`${todo.dateFrom}T${todo.start}`);
  const endTime = new Date(`${todo.dateFrom}T${todo.end}`);

  // ---------------------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------------------

  const {
    seconds,
    minutes,
    hours,
    isRunning,
  } = useTimer({
    expiryTimestamp: endTime,
    onExpire: () => console.warn('Timer ended'),
  });


  // ---------------------------------------------------------------------------------------
  // Functions
  // ---------------------------------------------------------------------------------------

  const onDeleteTodo = async (todoId: string) => {
    const resDelete = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/${isCompleted ? `completed-todos/${todoId}` : `todos/${todoId}`}`)
    if (resDelete.status === 200) {
      await refetch()
      toast.success("Todo deleted successfully.");
    }
  }


  // ---------------------------------------------------------------------------------------
  return (
    <Card className={`w-[350px] ${isCompleted ? "bg-green-400" : ''} shadow-lg`}>
      <CardHeader>
        <h1 className={'text-center text-xl'}>{todo.dateFrom}</h1>
        <CardTitle>{todo.title} </CardTitle>
        <CardDescription>{todo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isRunning ? (
          <div>
            Time left: {hours}h {minutes}m {seconds}s
          </div>
        ) : (
          <div>{`Time's up`}</div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Modal
          title={`Editing Todo: ${todo.title}`}
          asChildButton={<Button variant="outline">Edit Todo</Button>}
        >
          <CreateOrUpdateTodoForm todo={todo} refetch={refetch}/>
        </Modal>
        <Button onClick={() => {
          if (todo.id) {
            onDeleteTodo(todo.id)
          }
        }} variant={'destructive'}>Delete</Button>
        {!todo.completed && <Button onClick={async () => {
          const updatedTodo: TodoType = {
            ...todo,
            completed: true
          }
          if (onComplete) {
            const res = await onComplete(updatedTodo)
            if(res){
              toast.success('Todo is completed successfully.');
            }
          }
        }}>Complete</Button>}
      </CardFooter>
    </Card>
  );
};

export default TodoComponent;