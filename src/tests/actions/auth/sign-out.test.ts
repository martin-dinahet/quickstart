import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";
import { signOut } from "./sign-out";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@/lib/session", () => ({
  deleteSession: jest.fn(),
}));

describe("signOut", () => {
  const mockDeleteSession = deleteSession as jest.Mock;
  const mockRedirect = redirect as unknown as jest.Mock;

  beforeEach(() => {
    mockDeleteSession.mockReset();
    mockRedirect.mockReset();
  });

  it("deletes the session and redirects to login", async () => {
    mockDeleteSession.mockResolvedValue(undefined);
    await signOut();
    expect(mockDeleteSession).toHaveBeenCalled();
    expect(mockRedirect).toHaveBeenCalledWith("/auth/login");
  });

  it("propagates session deletion errors", async () => {
    const error = new Error("Failed to delete session");
    mockDeleteSession.mockRejectedValue(error);
    await expect(signOut()).rejects.toThrow("Failed to delete session");
    expect(mockRedirect).not.toHaveBeenCalled();
  });
});
