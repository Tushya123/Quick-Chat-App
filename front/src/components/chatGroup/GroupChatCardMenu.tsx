"use client";
import React, { Suspense, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import EditGroupChat from "./EditGroupChat";
import { toast } from "sonner";
import Env from "@/src/lib/env";
const DeleteChatGroup = dynamic(() => import("./DeleteChatGroup"));
//lazy load
export default function GroupChatCardMenu({
  group,
  user,
}: {
  group: GroupChatType;
  user: CustomUser;
}) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialoag, setEditDialog] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(`${Env.APP_URL}/chat/${group.id}`);
    toast.success("Link copied successfully!");
  };

  return (
    <>
      {deleteDialog && (
        <Suspense fallback={<p>Loading...</p>}>
          <DeleteChatGroup
            open={deleteDialog}
            setOpen={setDeleteDialog}
            groupId={group.id}
            token={user.token!}
          />
        </Suspense>
      )}
      {editDialoag && (
        <Suspense fallback={<p>Loading...</p>}>
          <EditGroupChat
            open={editDialoag}
            setOpen={setEditDialog}
            user={user}
            group={group}
          />
        </Suspense>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsVerticalIcon className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative z-30 bg-white">
          <DropdownMenuItem onClick={handleCopy} className="hover:bg-blue-200">Copy</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setEditDialog(true)} className="hover:bg-blue-200">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteDialog(true)} className="hover:bg-blue-200">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
