"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface props {
  userId: number
}

export default function CreateTaskForm({userId}: props) {
  const [title, setTitle] = useState("")
  const [detail, setDetail] = useState("")
  const [status, setStatus] = useState(0)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch(`${process.env.NEXT_PUBLIC_RASPBERRYPI_URL}/task/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        detail: detail,
        status: status,
      }),
    })

    if (!response.ok) {
      console.error("タスクの作成に失敗しました")
      return
    }

    console.log("タスクが作成されました")

    // 画面をリフレッシュして最新データを表示したい
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          className="w-full border rounded px-2 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Detail</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Status</label>
        <select
          className="border rounded px-2 py-1"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
        >
          <option value={0}>未着手</option>
          <option value={1}>進行中</option>
          <option value={2}>完了</option>
        </select>
      </div>

      <div className="mt-4 flex justify-end">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create
        </button>
      </div>
    </form>
  )
}
