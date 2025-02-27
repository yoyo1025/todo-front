// import { auth } from "@/auth";
// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function GET(req: Request) {
//   console.log("API Route /api/user が呼ばれました");


//   // auth.tsのJWTから直接token.accessTokenを取得
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET })

//   console.log("取得したJWT:", token);

//   const session = await auth();
//   console.log(session?.accessToken);
  
//   if (!session?.accessToken) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   console.log("Goへリクエスト送信");
  
//   // バックエンドから userId を取得
//   const res = await fetch("http://localhost:30000/api/auth/github", {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${session?.accessToken}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     console.log("失敗した");
    
//     return NextResponse.json({ error: "Failed to fetch userId" }, { status: res.status });
//   }

//   const data = await res.json();
//   return NextResponse.json({ userId: data.user_id });
// }
