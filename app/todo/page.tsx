import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Todo() {
  const session = await auth()

  console.log(session?.user?.name);
  

  if (!session) {
    redirect("/") // 未ログインならトップページへ
  }

  return (
    <div>
      TODOページだよ。認証済みならここが表示されます。
    </div>
  )
}