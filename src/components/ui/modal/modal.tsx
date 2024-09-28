import React, {ReactNode} from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

const Modal = (
  {
    asChildButton,
    title,
    description,
    children
  }: {
    asChildButton: ReactNode,
    title: string,
    description?: string,
    children: ReactNode,
  }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {asChildButton}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {children}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;