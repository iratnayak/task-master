'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {
  console.log("SERVER ACTION CALLED!");

  const title = formData.get("title") as string;
  
  console.log("Task Title:", title);

  if (!title) {
    return;
  }

  try {
    await db.task.create({
      data: {
        title: title,
        status: "TODO",
      },
    });
    console.log("Task Saved to DB!"); 
  } catch (error) {
    console.error("DB Error:", error); 
  }

  revalidatePath("/");
}