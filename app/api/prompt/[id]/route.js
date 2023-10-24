import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (req, {params}) => { 

    try {
        await connectToDatabase();    
        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response(JSON.stringify({message: 'Prompt not found'}), { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }

}

export const PATCH = async (req, {params}) => {
    const { prompt, tag } = await req.json();

    if (!prompt || !tag) {
        return new Response(JSON.stringify({ message: 'Prompt and tag are required' }), { status: 400 });
    }

    try {
        await connectToDatabase();    
        const updatedPrompt = await Prompt.findByIdAndUpdate(params.id, {
            prompt,
            tag
        }, {new: true}).populate('creator');

        if(!updatedPrompt) return new Response(JSON.stringify({message: 'Prompt not found'}), { status: 404 })

        return new Response(JSON.stringify(updatedPrompt), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}

export const DELETE = async (req, {params}) => {
    try {
        await connectToDatabase();    
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

        if(!deletedPrompt) return new Response(JSON.stringify({message: 'Prompt not found'}), { status: 404 })

        return new Response(JSON.stringify(deletedPrompt), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }
}