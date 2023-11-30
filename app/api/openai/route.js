import OpenAI from 'openai';

export const POST = async (req) => {
    const openiaApiKey = process.env.OPENAI_API_KEY;
    const openaiApiOrg = process.env.OPENAI_API_ORG;

    const { prompt } = await req.json();

    const openai = new OpenAI(openiaApiKey, openaiApiOrg);

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
    });

    return new Response(JSON.stringify(chatCompletion.choices[0]), { status: 200 });

}