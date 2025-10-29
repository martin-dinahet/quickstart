import "@testing-library/jest-dom";
import { cookies } from "next/headers";
import { decryptJWT } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./get-current-user";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("@/lib/jwt", () => ({
  decryptJWT: jest.fn(),
}));

jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

describe("getCurrentUser", () => {
  const mockCookies = cookies as jest.Mock;
  const mockDecryptJWT = decryptJWT as jest.Mock;
  const mockFindUnique = prisma.user.findUnique as jest.Mock;

  beforeEach(() => {
    mockCookies.mockReset();
    mockDecryptJWT.mockReset();
    mockFindUnique.mockReset();
  });

  it("returns null when no session cookie exists", async () => {
    mockCookies.mockReturnValue({
      get: jest.fn().mockReturnValue(undefined),
    });
    const user = await getCurrentUser();
    expect(user).toBeNull();
    expect(mockDecryptJWT).not.toHaveBeenCalled();
    expect(mockFindUnique).not.toHaveBeenCalled();
  });

  it("returns null when session token is expired", async () => {
    const expiredDate = new Date(Date.now() - 1000).toISOString();
    mockCookies.mockReturnValue({
      get: jest.fn().mockReturnValue({ value: "expired-token" }),
    });
    mockDecryptJWT.mockResolvedValue({
      userId: "user-123",
      expiresAt: expiredDate,
    });
    const user = await getCurrentUser();
    expect(user).toBeNull();
    expect(mockDecryptJWT).toHaveBeenCalledWith("expired-token");
    expect(mockFindUnique).not.toHaveBeenCalled();
  });

  it("returns user data when session is valid", async () => {
    const futureDate = new Date(Date.now() + 3600000).toISOString();
    const mockUser = {
      id: "user-123",
      email: "test@example.com",
      username: "testuser",
    };
    mockCookies.mockReturnValue({
      get: jest.fn().mockReturnValue({ value: "valid-token" }),
    });
    mockDecryptJWT.mockResolvedValue({
      userId: mockUser.id,
      expiresAt: futureDate,
    });
    mockFindUnique.mockResolvedValue(mockUser);
    const user = await getCurrentUser();
    expect(user).toEqual(mockUser);
    expect(mockDecryptJWT).toHaveBeenCalledWith("valid-token");
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: mockUser.id },
      select: { id: true, email: true, username: true },
    });
  });

  it("handles non-existent user in database", async () => {
    const futureDate = new Date(Date.now() + 3600000).toISOString();
    mockCookies.mockReturnValue({
      get: jest.fn().mockReturnValue({ value: "valid-token" }),
    });
    mockDecryptJWT.mockResolvedValue({
      userId: "non-existent-user",
      expiresAt: futureDate,
    });
    mockFindUnique.mockResolvedValue(null);
    const user = await getCurrentUser();
    expect(user).toBeNull();
    expect(mockDecryptJWT).toHaveBeenCalledWith("valid-token");
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: "non-existent-user" },
      select: { id: true, email: true, username: true },
    });
  });
});
