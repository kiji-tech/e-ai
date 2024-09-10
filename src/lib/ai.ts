import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_SECRET });

export class AI {
    private static instance: AI | undefined;
    public static getInstance() {
        if (!this.instance) this.instance = new AI();
        return this.instance;
    }

    public async run(messages: ChatCompletionMessageParam[], response_format: any) {
        const modelName = process.env.OPEN_AI_MODEL!;
        try {
            const completion = await openai.chat.completions.create({
                messages,
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
