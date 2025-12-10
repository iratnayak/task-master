'use server';

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createTask(formData: FormData) {

    const title = formData.get("title") as string;

    if (!title || title.trim() === "") {
        return;
    }

    await db.task.create({
        data: {
            title: title,
            status: "NEXT",
        },
    });

    revalidatePath("/")
}

