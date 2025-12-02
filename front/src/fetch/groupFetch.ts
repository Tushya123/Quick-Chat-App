import { CHAT_GROUP,CHAT_GROUP_USERS } from "../lib/apiAuthRoutes";
export async function fetchChatGroups(token:string){
  const res = await fetch(CHAT_GROUP,{
    headers:{
    Authorization:token
  },
  next:{
    revalidate:60*60,
    tags:["dashboard"]
  }
})
  if(!res.ok){
    throw new Error("Failed to fetch data")
  }
  const response = await res.json();
  if(response?.data){
    return response?.data
  }
  return [];
}
// The next object is specific to Next.js and controls caching behavior:
// revalidate: 60*60 means the data will be revalidated (re-fetched) every hour (3600 seconds).
// tags: ["dashboard"] allows you to invalidate this cache by tag later, useful for dynamic updates.
// This caching and revalidation logic helps improve performance and reduce server load.

export async function fetchChatGroup(id: string) {
  const res = await fetch(`${CHAT_GROUP}/${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return null;
}

// export async function fetchChatGroupUsers(id: string) {
//   const res = await fetch(`${CHAT_GROUP_USERS}?group_id=${id}`, {
//     cache: "no-cache",
//   });

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }
//   const response = await res.json();
//   if (response?.data) {
//     return response?.data;
//   }
//   return [];
// }
export async function fetchChatUsers(id: string) {
  const res = await fetch(`${CHAT_GROUP_USERS}?group_id=${id}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}
