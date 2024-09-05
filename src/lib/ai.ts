import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_SECRET });

export class AI {
    private static instance: AI | undefined;
    public static getInstance() {
        if (!this.instance) this.instance = new AI();
        return this.instance;
    }

    public async run(systemContent: string, userContent: string, response_format: any) {
        if (!systemContent) {
            throw new Error("SystemContent is not found.");
        }
        const modelName = process.env.OPEN_AI_MODEL!;
        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: systemContent },
                    {
                        role: "user",
                        content: userContent,
                    },
                ],
                response_format: zodResponseFormat(response_format, "event"),
                model: modelName,
                top_p: 0.9,
                stream: true,
            });
            let content = "";
            for await (const chank of completion) {
                chank.choices.forEach((choice) => {
                    content = content += choice.delta?.content || "";
                });
            }

            return JSON.parse(content);
        } catch (e) {
            return e;
        }
    }
}
