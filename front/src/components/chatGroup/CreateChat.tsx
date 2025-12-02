"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createChatSchema,
  createChatSchemaType,
} from "@/src/validations/chatSchema";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { CHAT_GROUP } from "@/src/lib/apiAuthRoutes";
import { toast } from "sonner";
import { clearCache } from "@/src/actions/common";

export default function CreateChat({ user }: { user: CustomUser }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createChatSchemaType>({
    resolver:zodResolver(createChatSchema)
  });
 
  const onSubmit = async (payload:createChatSchemaType) => {
    console.log("The Chat Payload is",payload)
    try {
      setLoading(true);
      const {data} = await axios.post(CHAT_GROUP,{...payload,user_id:user.id},{
        headers:{
          Authorization:user.token
        }
      });
      if(data?.message ){
        clearCache("dashboard")  // we need to remove cache as in fetch we used it
        setLoading(false)
        setOpen(false)
        toast.success(data?.message)
      }
    }
    catch (error){
      setLoading(false);
      if(error instanceof AxiosError){
        toast.error(error.message)
      }
      else {
        toast.error("Something went wrong.Please try again!")
      }
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white mr-[1rem]">Create Chat</Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} className="relative z-50 bg-white">
        <DialogHeader>
          <DialogTitle>Create your new Chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
      
      <div className="mt-4">
        <Input placeholder="Enter Chat Title ..."{...register("title")}/>
        <span className="text-red-500">{errors?.title?.message}</span>
      </div> 
      <div className="mt-4">
        <Input placeholder="Enter Chat Passcode ..."{...register("passcode")}/>
        <span className="text-red-500">{errors?.passcode?.message}</span>
      </div>
      <div className="mt-4">
        <Button className="w-full bg-black text-white" disabled={loading}>{loading ? 'Processing..':'Submit'}</Button>
      </div>
    </form>
      </DialogContent>
    </Dialog>
  );
}
