import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`,
    {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
    }
  )

  if (!response.ok) {
    redirect("/admin/login")
  }

  const session = await response.json()

  if (!session?.user) {
    redirect("/admin/login")
  }

  return children
}