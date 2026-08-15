import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // AI Chat Assistant
  chat: router({
    sendMessage: publicProcedure
      .input(z.object({
        message: z.string().min(1).max(2000),
      }))
      .mutation(async ({ input }) => {
        const SYSTEM_PROMPT = `You are Divyansh Kashiv's AI portfolio assistant. You help visitors learn about Divyansh. Here are the key facts about him:

- Name: Divyansh Kashiv
- Role: Java Developer & Android Explorer
- Education: 2nd Year B.Tech IT at NIET (Noida Institute of Engineering & Technology)
- CGPA: 8.6
- Skills: Java (primary), Spring Boot, Android SDK, React Native, Python, HTML5, CSS3, JavaScript
- DSA: 80+ problems solved on LeetCode
- Projects:
  1. SecureBank - Banking app with secure transactions (Java/Android)
  2. Campus Placement Platform - Connects students with recruiters (Java/Spring Boot)
  3. Interactive Portfolio Website - This website itself (React/Three.js)
  4. VenomX - An interactive game built with Java
- Certifications: Java Programming, Introduction to Subagents, AI Fluency
- Email: padhaikaroiit2007@gmail.com
- GitHub: github.com/divyanshkashiv
- LinkedIn: linkedin.com/in/divyanshkashiv

Rules:
- Answer ONLY questions about Divyansh's skills, projects, experience, and background.
- If asked about something unrelated to Divyansh, politely redirect: "I can only answer questions about Divyansh's portfolio. Feel free to ask about his skills, projects, or experience!"
- Be friendly, concise, and professional.
- Keep responses under 150 words.
- Use markdown formatting for readability.`;

        try {
          const response = await invokeLLM({
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: input.message },
            ],
          });

          const reply = response.choices[0]?.message?.content;
          if (!reply) {
            return { success: false, error: "No response from AI" };
          }

          return { success: true, reply };
        } catch (error) {
          console.error("[Chat] LLM error:", error);
          return { success: false, error: "Failed to get AI response" };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
