
import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {

    const todos = formatTodosForAI(board);  //because sometimes ai mess up the format and we dont want that 
    console.log("formated todo to send>>", todos)
    const res = await fetch("/api/generateSummary", {
        method: "POST",
        headers: {

            "Content-Type": "application/json",
        },
        body: JSON.stringify({ todos }),
    });
    const GPTdata = await res.json();
    const { content } = GPTdata;
    console.log(res);
    return content;
}

export default fetchSuggestion;