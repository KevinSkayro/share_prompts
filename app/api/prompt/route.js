import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async (req) => {
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}