import { auth } from "@/auth"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { redirect } from "next/navigation"

type Task = {
  id: number
  user_id: number
  title: string
  detail: string
  status: number
}

import TodoList from "./TodoList"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import CreateTaskForm from "./CreateTaskForm"

export default async function TodoPage() {
  const session = await auth()
  if (!session) {
    redirect("/")
  }

  const userId = 1
  const res = await fetch(`http://localhost:30000/task/${userId}`, {
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error("タスク取得に失敗しました")
  }
  const tasks = (await res.json()) as Task[]

  return (
    <>
      <Badge variant="outline" className="rounded-3xl mx-2 my-3 border">
        <div className="flex items-center">
          <Avatar className="mx-2 my-2">
            <AvatarImage src={session.user?.image ?? undefined} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="mx-2 text-base">{session.user?.name}</div>
        </div>
      </Badge>

      <TodoList tasks={tasks} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="fixed z-50 bottom-10 right-10 flex items-center justify-center w-12 h-12 text-4xl border-2 bg-blue-400 rounded-full cursor-pointer hover:bg-blue-500 md:bottom-5 right-5">
            +
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="center" className="mb-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full text-left px-2 py-1">
                Create Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Task</DialogTitle>
                <DialogDescription>
                  Enter the details of your new task below.
                </DialogDescription>
              </DialogHeader>
              {/* ここにフォームコンポーネントを表示 */}
              <CreateTaskForm />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
