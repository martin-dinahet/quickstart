import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { signIn } from "./sign-in";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("@/lib/session", () => ({
  createSession: jest.fn(),
}));

describe("signIn", () => {
  const mockFindUnique = prisma.user.findUnique as jest.Mock;
  const mockCreateSession = createSession as jest.Mock;
  const mockRedirect = redirect as unknown as jest.Mock;

  beforeEach(() => {
    mockFindUnique.mockReset();
    mockCreateSession.mockReset();
    mockRedirect.mockReset();
  });

  it("validates email format", async () => {
    const formData = new FormData();
    formData.append("email", "not-an-email");
    formData.append("password", "password123");
    const result = await signIn({}, formData);
    expect(result.success).toBe(false);
    expect(result.errors.email).toContain("Invalid email or password");
    expect(mockFindUnique).not.toHaveBeenCalled();
  });

  it("validates form data types", async () => {
    const formData = new FormData();
    // @ts-expect-error Testing non-string values
    formData.append("email", null);
    // @ts-expect-error Testing non-string values
    formData.append("password", undefined);
    const result = await signIn({}, formData);
    expect(result.success).toBe(false);
    expect(result.errors.email).toContain("Invalid email or password");
    expect(mockFindUnique).not.toHaveBeenCalled();
  });

  it("returns error when user is not found", async () => {
    const formData = new FormData();
    formData.append("email", "notfound@example.com");
    formData.append("password", "password123");
    mockFindUnique.mockResolvedValue(null);
    const result = await signIn({}, formData);
    expect(result.success).toBe(false);
    expect(result.errors.email).toContain("Incorrect email or password");
    expect(result.form).toEqual({
      email: "notfound@example.com",
      password: "password123",
    });
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { email: "notfound@example.com" },
    });
    expect(mockCreateSession).not.toHaveBeenCalled();
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("returns error when password is incorrect", async () => {
    const formData = new FormData();
    formData.append("email", "user@example.com");
    formData.append("password", "wrongpassword");
    mockFindUnique.mockResolvedValue({
      id: "user-123",
      email: "user@example.com",
      password: "correctpassword",
    });
    const result = await signIn({}, formData);
    expect(result.success).toBe(false);
    expect(result.errors.password).toContain("Incorrect email or password");
    expect(result.form).toEqual({
      email: "user@example.com",
      password: "wrongpassword",
    });
    expect(mockCreateSession).not.toHaveBeenCalled();
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("creates session and redirects on successful login", async () => {
    const formData = new FormData();
    formData.append("email", "user@example.com");
    formData.append("password", "correctpassword");
    const mockUser = {
      id: "user-123",
      email: "user@example.com",
      password: "correctpassword",
    };
    mockFindUnique.mockResolvedValue(mockUser);
    mockCreateSession.mockResolvedValue(undefined);
    await signIn({}, formData);
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { email: "user@example.com" },
    });
    expect(mockCreateSession).toHaveBeenCalledWith(mockUser.id);
    expect(mockRedirect).toHaveBeenCalledWith("/dashboard");
  });

  it("preserves previous form state in errors", async () => {
    const prevState = {
      form: {
        email: "old@example.com",
        password: "oldpassword",
      },
    };
    const formData = new FormData();
    formData.append("email", "invalid-email");
    formData.append("password", "short");
    const result = await signIn(prevState, formData);
    expect(result.success).toBe(false);
    expect(result.form).toEqual({
      ...prevState.form,
      email: "invalid-email",
      password: "short",
    });
  });
});
