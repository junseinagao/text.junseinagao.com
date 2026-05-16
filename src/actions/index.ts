import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";
import { env } from "cloudflare:workers";

export const server = {
  contact: defineAction({
    accept: "form",
    handler: async ({ name, email, message }) => {
      const to = env.CONTACT_TO_EMAIL;
      const from = env.CONTACT_FROM_EMAIL;
      const secretKey = env.PLUNK_SECRET_KEY;

      const res = await fetch("https://next-api.useplunk.com/v1/send", {
        body: JSON.stringify({
          body: `<p><strong>名前:</strong> ${name}</p><p><strong>メール:</strong> ${email}</p><p><strong>メッセージ:</strong></p><p>${message.replaceAll("\n", "<br>")}</p>`,
          from,
          reply: email,
          subject: `コンタクト: ${name}`,
          to,
        }),
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!res.ok) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "メール送信に失敗しました。しばらく経ってから再度お試しください。",
        });
      }

      return { success: true };
    },
    input: z.object({
      email: z
        .string()
        .email("正しいメールアドレスを入力してください")
        .max(256),
      message: z.string().min(1, "メッセージを入力してください").max(2048),
      name: z.string().min(1, "名前を入力してください").max(256),
    }),
  }),
};
