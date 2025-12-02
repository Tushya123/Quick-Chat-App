"use client";
import React, { useState, useEffect, useMemo, Fragment } from "react";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import ChatSidebar from "./ChatSidebar";
import Chats from "./Chats";
import { getSocket } from "@/src/lib/socket.config";
import { v4 as uuidV4 } from "uuid";
export default function ChatBase({
  group,users,oldMessages
}: {
  group: GroupChatType,
  users:Array<GroupChatUserType> | []
  oldMessages?: Array<MessageType> | [];
}) {
  // const socketInstance = useMemo(() => {
  //   const socket = getSocket();
  //   socket.auth = {
  //     room: groupId
  //   }
  //   return socket;
  // }, []);

  // useEffect(() => {
  //   socketInstance.connect(); // Connect only once

  //   socketInstance.on("message", (data: unknown) => {
  //     console.log("The socket message is", data);
  //   });

  //   return () => {
  //     socketInstance.disconnect(); // or .close()
  //   };
  // }, [socketInstance]);
  const [open,setOpen] = useState(true);
  const [chatUser,setChatUser] = useState<GroupChatUserType>();
  useEffect(()=>{
    const data = localStorage.getItem(group.id);
    if(data){
      const pData = JSON.parse(data);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChatUser(pData);
    }
  },[group.id])
  return <div className="flex">
   <ChatSidebar users={users}/>  
   <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
   {open ? <ChatUserDialog open={open} setOpen={setOpen} group={group}/> : <ChatNav users={users}/>}
   <Chats group={group} chatUser={chatUser} oldMessages={oldMessages}/>
   </div>
   </div>
}
