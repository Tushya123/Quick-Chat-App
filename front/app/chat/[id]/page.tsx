import ChatBase from "@/src/components/chat/ChatBase";
import { fetchChats } from "@/src/fetch/chatsFetch";
import { fetchChatGroup, fetchChatUsers } from "@/src/fetch/groupFetch";
import { notFound } from "next/navigation";
import React from "react";
// In nextjs app router params is Promise in Server COmponents 
export default async function chat({params}:{params:Promise<{id:string}>}){
  const {id} = await params;
  if(id.length !== 36) {
    return notFound();
  }
  const group:GroupChatType | null = await fetchChatGroup(id);
  if(group === null){
    return notFound();
  }
  const users:Array<GroupChatUserType> | [] = await fetchChatUsers(id);
  const chats:Array<MessageType> | [] = await fetchChats(id);
  return (
    <div>
      <ChatBase group={group} users={users} oldMessages={chats}/>
    </div>
  )
}
