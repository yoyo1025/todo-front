// import { auth } from "@/auth";
// import { error } from "console";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const session = await auth();
//   if (!session?.accessToken) {
//     return NextResponse.json({
//       error: "Unauthorized"
//     },{
//       status: 401
//     })
//   };

//   const res = await fetch(`http://localhost:30000/task/${session.user?.id}`, {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${session.accessToken}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     return NextResponse.json({ error: "タスク取得に失敗しました" }, { status: res.status });
//   }

//   const tasks = await res.json();
//   return NextResponse.json(tasks);
// }