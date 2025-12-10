'use server'

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateTaskStatus(formData: FormData) {
    const taskId = formData.get("id") as string;
    const newStatus = formData.get("newStatus") as string;

    if (!taskId || !newStatus) return;

    await db.task.update({
        where: {
            id: taskId,
        },

        data: {
            status: newStatus,
        },
    });

revalidatePath("/");
    
}