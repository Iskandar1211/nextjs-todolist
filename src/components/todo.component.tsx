import React, {useEffect} from 'react';
import {TodoType} from "@/schemas/todo.schema";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useTimer} from "react-timer-hook";
import Modal from "@/components/ui/modal/modal";
import CreateOrUpdateTodoForm from "@/components/forms/create-or-update-todo-form";
import {useGetTodos} from "@/hooks/useGetTodos";
import useOnComplete from "@/hooks/useOnComplete";

const TodoComponent = ({todo}: { todo: TodoType }) => {
  const startTime = new Date(`${todo.dateFrom}T${todo.start}`);
  const endTime = new Date(`${todo.dateFrom}T${todo.end}`);
  const {getTodos} = useGetTodos()
  const {onComplete, isCompleted} = useOnComplete()
  console.log("isCompleted",isCompleted)
  useEffect(() => {
    if(!isCompleted) return
    getTodos()
  }, [isCompleted]);

  const {
    seconds,
    minutes,
    hours,
    isRunning,
  } = useTimer({
    expiryTimestamp: endTime,
    onExpire: () => console.warn('Timer ended'),
  });

  return (
    <Card className={`w-[350px] ${todo.completed ? "bg-green-400" : ''}`}>
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
          <div>Time's up</div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Modal
          title={`Editing Todo: ${todo.title}`}
          asChildButton={<Button variant="outline">Edit Todo</Button>}
        >
          <CreateOrUpdateTodoForm getTodos={getTodos} todo={todo}/>
        </Modal>
        {!todo.completed && <Button onClick={() => {
          const updatedTodo: TodoType = {
            ...todo,
            completed: true
          }
          onComplete(updatedTodo)
        }}>Complete</Button>}
      </CardFooter>
    </Card>
  );
};

export default TodoComponent;