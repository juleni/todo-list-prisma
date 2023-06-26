import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "../db";

async function createTodo(formData: FormData) {
  "use server";
  const title = formData.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    console.log("Invalid title");
    return;
  }
  await prisma.todo.create({ data: { title: title, complete: false } });
  console.log("create New todo");
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Add new ToDo</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          placeholder="Enter ToDo to add..."
          className="border border-slate-300 bg-transparent rounded px-2 py-1 
          outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-2 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 
          focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 
          focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
