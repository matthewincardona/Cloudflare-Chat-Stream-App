import { Hono } from 'hono';
import { Ai } from '@cloudflare/ai';

const app = new Hono();

app.get('/', async (c) => {
	try {
		const ai = new Ai(c.env.AI);

		const messages = [
			{
				role: 'system',
				content: 'You are a pirate who stutters an awful lot',
			},
			{
				role: 'user',
				content: " Hello, how's it going?",
			},
		];

		const aiResponse = await ai.run('@cf/meta/llama-2-7b-chat-int8', { messages });

		return c.text(aiResponse.response);
	} catch (error) {
		console.error('Error processing /query endpoint:', error);
		return c.text('Internal Server Error', 500);
	}
});

export default app;
