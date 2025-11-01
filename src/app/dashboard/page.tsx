import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signOutAction } from "@/lib/actions/auth/sign-out-action";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return redirect("/sign-in");

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{session.user.name}</h2>
          <div className="text-sm text-muted">{session.user.email}</div>
          <div className="text-xs text-muted">{session.user.id}</div>
          <div className="mt-4">
            <button className="btn btn-sm btn-outline" type="button" onClick={signOutAction}>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
