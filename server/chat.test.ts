import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the LLM invoke function
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(),
}));

import { invokeLLM } from "./_core/llm";

function createContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as unknown as TrpcContext["res"],
  };
}

describe("chat.sendMessage", () => {
  it("should return a successful response when LLM responds", async () => {
    const mockResponse = {
      choices: [{ message: { content: "Divyansh is a Java developer!" } }],
    };

    vi.mocked(invokeLLM).mockResolvedValue(mockResponse as any);

    const caller = appRouter.createCaller(createContext());
    const result = await caller.chat.sendMessage({ message: "What does he do?" });

    expect(result.success).toBe(true);
    expect(result.reply).toContain("Java developer");
  });

  it("should return failure when LLM returns no content", async () => {
    const mockResponse = {
      choices: [{ message: { content: "" } }],
    };

    vi.mocked(invokeLLM).mockResolvedValue(mockResponse as any);

    const caller = appRouter.createCaller(createContext());
    const result = await caller.chat.sendMessage({ message: "Hello" });

    expect(result.success).toBe(false);
  });

  it("should reject empty messages", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(
      caller.chat.sendMessage({ message: "" })
    ).rejects.toThrow();
  });
});
