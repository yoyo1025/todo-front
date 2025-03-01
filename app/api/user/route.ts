import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // リクエストの body から accessToken を受け取る
    const session = await auth();

    console.log("/api/auth/userにおけるsession");
    console.log(session);

    console.log("アクセストークン");
    console.log(session?.accessToken);
    

    // 外部 API にリクエストする
    const userInfo = await fetch("http://localhost:30000/api/auth/github", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!userInfo.ok) {
      throw new Error("Failed to fetch user info from GitHub API")
    }

    // JSON をパース
    const data = await userInfo.json()
    // レスポンスとして返す
    return NextResponse.json(data)
  } catch (error: any) {
    console.error(error)
    return new NextResponse(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500 },
    )
  }
}
