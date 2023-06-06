import { NextResponse } from "next/server";
import openai from "@/openai";


export async function POST(request: Request) {
    const { todos } = await request.json();

    //communicate with open ai
    const response = await openai.createChatCompletion({
        model: "gpt-3.5 turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: `While responding, Welcome the user always as Mr.Akhilesh and say welcome to our trello todo App! Limit the response to 200 characters`
            },

            {
                role: "user",
                content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, in progress and done, 
            then tell the user to have a productive day! Here's the data:${JSON.stringify({ todos })}`
            },
        ],
    });

    //destructuring data from open ai
    const { data } = response;

    console.log("Data is:", data);
    console.log(data.choices[0].message);
    return NextResponse.json(data.choices[0].message);
}



