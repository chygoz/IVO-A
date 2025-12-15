"use server";

import { revalidateTag as revalidate, revalidatePath } from "next/cache";

async function revalidateTag(name: string) {
  // In Next.js 16, revalidateTag might require a second parameter
  // Using a default empty object for the profile parameter
  revalidate(name, {});
}

export default revalidateTag;

export async function revalidatePage(name: string) {
  revalidatePath(name, "layout");
}
