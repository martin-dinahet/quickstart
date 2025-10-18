import type { FC } from "react";
import { getCurrentUser } from "@/lib/actions/auth/get-current-user";
import { signOut } from "@/lib/actions/auth/sign-out";

const DashboardPage: FC = async () => {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {!user ? (
          <div className="prose">
            <h2>Not signed in</h2>
            <p>You are not currently signed in.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{user.username}</h2>
            <div className="text-sm text-muted">{user.email}</div>
            <div className="text-xs text-muted">id: {user.id}</div>
            <div className="mt-4">
              <button className="btn btn-sm btn-outline" type="button" onClick={signOut}>
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
