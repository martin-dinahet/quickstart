import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { signUp } from "./sign-up";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock("@/lib/session", () => ({
  createSession: jest.fn(),
}));

describe("signUp", () => {
  const mockFindUnique = prisma.user.findUnique as jest.Mock;
  const mockCreate = prisma.user.create as jest.Mock;
  const mockCreateSession = createSession as jest.Mock;
  const mockRedirect = redirect as unknown as jest.Mock;

  beforeEach(() => {
    mockFindUnique.mockReset();
    mockCreate.mockReset();
    mockCreateSession.mockReset();
    mockRedirect.mockReset();
  });

  it("validates username length", async () => {
    const formData = new FormData();
    formData.append("username", "a");
    formData.append("email", "test@example.com");
    formData.append("password", "password123");
    const result = await signUp({}, formData);
    expect(result.success).toBe(false);
    expect(result.errors.username).toContain("Username must be at least 3 characters");
    expect(mockFindUnique).not.toHaveBeenCalled();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("validates email format", async () => {
    const formData = new FormData();
    formData.append("username", "validuser");
    formData.append("email", "not-an-email");
    formData.append("password", "password123");
    const result = await signUp({}, formData);
    expect(result.success).toBe(false);
    expect(result.errors.email).toContain("Invalid email address");
    expect(mockFindUnique).not.toHaveBeenCalled();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("validates password length", async () => {
    const formData = new FormData();
    formData.append("username", "validuser");
    formData.append("email", "test@example.com");
    formData.append("password", "short");
    const result = await signUp({}, formData);
    expect(result.success).toBe(false);
    expect(result.errors.password).toContain("Password must be at least 6 characters");
    expect(mockFindUnique).not.toHaveBeenCalled();
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("checks for existing email", async () => {
    const formData = new FormData();
    formData.append("username", "newuser");
    formData.append("email", "exists@example.com");
    formData.append("password", "password123");
    mockFindUnique.mockResolvedValue({
      id: "existing-user",
      email: "exists@example.com",
    });
    const result = await signUp({}, formData);
    expect(result.success).toBe(false);
    expect(result.errors.email).toContain("Email already in use");
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { email: "exists@example.com" },
    });
    expect(mockCreate).not.toHaveBeenCalled();
    expect(mockCreateSession).not.toHaveBeenCalled();
  });

  it("creates user and session on successful signup", async () => {
    const formData = new FormData();
    formData.append("username", "newuser");
    formData.append("email", "new@example.com");
    formData.append("password", "password123");
    const newUser = {
      id: "new-user-123",
      username: "newuser",
      email: "new@example.com",
      password: "password123",
    };
    mockFindUnique.mockResolvedValue(null);
    mockCreate.mockResolvedValue(newUser);
    mockCreateSession.mockResolvedValue(undefined);
    await signUp({}, formData);
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { email: "new@example.com" },
    });
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        username: "newuser",
        email: "new@example.com",
        password: "password123",
      },
    });
    expect(mockCreateSession).toHaveBeenCalledWith(newUser.id);
    expect(mockRedirect).toHaveBeenCalledWith("/dashboard");
  });

  it("preserves previous form state in errors", async () => {
    const prevState = {
      form: {
        username: "oldusername",
        email: "old@example.com",
        password: "oldpassword",
      },
    };
    const formData = new FormData();
    formData.append("username", "a");
    formData.append("email", "invalid-email");
    formData.append("password", "short");
    const result = await signUp(prevState, formData);
    expect(result.success).toBe(false);
    expect(result.form).toEqual({
      ...prevState.form,
      username: "a",
      email: "invalid-email",
      password: "short",
    });
  });

  it("handles non-string form values", async () => {
    const formData = new FormData();
    // @ts-expect-error Testing non-string values
    formData.append("username", null);
    // @ts-expect-error Testing non-string values
    formData.append("email", undefined);
    // @ts-expect-error Testing non-string values
    formData.append("password", 123);
    const result = await signUp({}, formData);
    expect(result.success).toBe(false);
    expect(result.errors.username).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(mockFindUnique).not.toHaveBeenCalled();
    expect(mockCreate).not.toHaveBeenCalled();
  });
});
