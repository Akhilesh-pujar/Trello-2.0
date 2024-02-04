
import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {

    const apiKey = "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"
    const todos = formatTodosForAI(board);  //because sometimes ai mess up the format and we dont want that 
    console.log("formated todo to send>>", todos)
    const res = await fetch("/api/generateSummary", {
        method: "POST",
        headers: {

            "Content-Type": "application/json",
            "Authorization":`Bearer ${apiKey}`
        },
        body: JSON.stringify({ todos }),
    });
    const GPTdata = await res.json();
    const { content } = GPTdata;
    console.log(res);
    return content;
}

export default fetchSuggestion;