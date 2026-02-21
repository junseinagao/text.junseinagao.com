import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(1, "名前を入力してください").max(256),
      email: z
        .string()
        .email("正しいメールアドレスを入力してください")
        .max(256),
      message: z.string().min(1, "メッセージを入力してください").max(2048),
    }),
    handler: async ({ name, email, message }, context) => {
      const env = context.locals.runtime.env;
      const to = env.CONTACT_TO_EMAIL;
      const from = env.CONTACT_FROM_EMAIL;
      const secretKey = env.PLUNK_SECRET_KEY;

      const res = await fetch("https://next-api.useplunk.com/v1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify({
          to,
          from,
          reply: email,
          subject: `コンタクト: ${name}`,
          body: `<p><strong>名前:</strong> ${name}</p><p><strong>メール:</strong> ${email}</p><p><strong>メッセージ:</strong></p><p>${message.replace(/\n/g, "<br>")}</p>`,
        }),
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
  }),
};
