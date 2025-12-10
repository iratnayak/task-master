'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteTask(formData:FormData) {
    const taskId = formData.get("id") as string;

    if (!taskId) return;

    await db.task.delete({
        where: {
            id: taskId,
        },
    });

    revalidatePath("/");
    
}