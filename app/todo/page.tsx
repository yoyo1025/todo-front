import { auth } from "@/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation"

type Task = {
  id: number;
  user_id: number;
  title: string;
  detail: string;
  status: number;
};

export default async function Todo() {
  // ログイン確認
  const session = await auth()
  if (!session) {
    redirect("/")
  }

  const userId = 1;
  const res = await fetch(`http://localhost:30000/task/${userId}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("タスク取得に失敗しました");
  }
  const tasks = (await res.json()) as Task[];

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

      {/* タスク一覧の表示 */}
      <div className="mt-4 space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="border p-2 rounded">
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.detail}</p>
            <p>Status: {task.status}</p>
          </div>
        ))}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="fixed z-50 bottom-10 right-10 py-5 px-2 w-12 h-12 text-4xl border-2 bg-blue-400 rounded-full cursor-pointer hover:bg-blue-500 md: bottom-5 right-5">+</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="center" className="mb-2"> 
          <DropdownMenuItem>Create Task</DropdownMenuItem>
          <DropdownMenuItem>Edit Task</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}