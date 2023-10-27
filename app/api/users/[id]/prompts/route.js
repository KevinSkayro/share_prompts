import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async (req, res,  {params}) => { 
    try {
        await connectToDatabase();    
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');

        res = new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        res = new Response(JSON.stringify(error), { status: 500 })
    }
    res.setHeader('Cache-Control: s-maxage=1, stale-while-revalidate');
    return res;
}