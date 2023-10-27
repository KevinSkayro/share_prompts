import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
export const revalidate = 10;
export const GET = async (req) => {
    try {
        await connectToDatabase();
        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'age': '0',
                'Cache-Control': 'public, max-age=0, must-revalidate',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}