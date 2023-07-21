import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

export async function POST(req: Request, res: NextResponse) {
  try {
    const body = await req.json()

    const configuration = new Configuration({
      apiKey: body.apiKey,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: body.messages,
    });
    console.log(completion.data.choices[0].message);
    const theResponse = completion.data.choices[0].message;

    return NextResponse.json({ output: theResponse }, { status: 200 })
  } catch (e) {
    return NextResponse.json({
      output: {
        role: "assistant",
        content: "Internal Server error",
      }
    }, { status: 500 })
  }
};