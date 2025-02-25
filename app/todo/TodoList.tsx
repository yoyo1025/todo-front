"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"

type Task = {
  id: number
  user_id: number
  title: string
  detail: string
  status: number
}

export default function TodoList({ tasks }: { tasks: Task[] }) {
  const [localTasks, setLocalTasks] = useState(tasks)

  const handleDelete = async (task: Task) => {
    const userId = task.user_id
    const taskId = task.id

    const response = await fetch(`http://localhost:30000/task/${userId}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        detail: task.detail,
        status: 2,
      }),
    })

    if (!response.ok) {
      console.error("タスクの更新に失敗しました")
      return
    }

    console.log("タスクが更新されました")

    setLocalTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: 2 } : t))
    )
  }

  const filteredTasks = localTasks.filter((task) => task.status === 0 || task.status === 1)

  return (
    <div className="mt-4 space-y-2 w-4/5 mx-auto">
      {filteredTasks.map((task) => (
        <Accordion type="single" collapsible key={task.id} className="cursor-pointer hover:bg-blue-50">
          <AccordionItem value={`item-${task.id}`}>
            <AccordionTrigger className="text-lg">
              <div className="w-full flex justify-between items-center">
                <div>{task.title}</div>
                <img
                  src="delete.svg"
                  className="w-5 h-5 mr-6 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation() // Accordion の展開を防ぐ
                    handleDelete(task)
                  }}
                />
              </div>
            </AccordionTrigger>
            <AccordionContent>{task.detail}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  )
}
