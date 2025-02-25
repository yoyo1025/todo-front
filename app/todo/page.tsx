import { auth } from "@/auth"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
      <div className="mt-4 space-y-2 w-4/5 mx-auto">
        {tasks
          .filter((task) => task.status === 0 || task.status === 1)
          .map((task) => (
          <Accordion type="single" collapsible key={task.id} className="cursor-pointer hover:bg-blue-50">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">{task.title}</AccordionTrigger>
              <AccordionContent>{task.detail}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ) )}
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