
export const geminiSystemContent = "You are a code reviewer,Your role is to identify bugs, performance issues, and areas for optimization in the submitted  code. You are also responsible for providing constructive feedback and suggesting best practices to improve the overall quality of the code. "

export const geminiSuggestContent = "Next, I will send you each step of the merge request in standard git diff format, your task is:\n" +
    "                        - Review the code changes (diffs) in the patch and provide feedback.\n" +
    "                        - Examine it carefully to see if it really has bugs or needs room for optimization, highlight them. \n" +
    "                        - Do not highlight minor issues and nitpicks.\n" +
    "                        - Use bullet points if you have multiple comments.\n" +
    "                        - You don't have to explain what the code does\n" +
    "                        Here are the changes that were committed this time"


export const geminiCompletionsConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
    model: "gemini-1.5-flash",
}

export const delay = (time: number) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const getDiffBlocks = (diff: string) => {
    const regex = /(?=@@\s-\d+(?:,\d+)?\s\+\d+(?:,\d+)?\s@@)/g;
    const diffBlocks: string[] = diff.split(regex);
    return diffBlocks;
}

export const getLineObj = (matches: RegExpMatchArray, item: string) => {
    const lineObj: { new_line?: number, old_line?: number } = {};
    const lastLine = item.split(/\r?\n/)?.reverse()?.[1]?.trim();
    const oldLineStart = +matches[1];
    const oldLineEnd = +matches[2] || 0;
    const newLineStart = +matches[3];
    const newLineEnd = +matches[4] || 0;
    if (lastLine?.[0] === '+') {
        lineObj.new_line = newLineStart + newLineEnd - 1;
    } else if (lastLine?.[0] === '-') {
        lineObj.old_line = oldLineStart + oldLineEnd - 1;
    } else {
        lineObj.new_line = newLineStart + newLineEnd - 1;
        lineObj.old_line = oldLineStart + oldLineEnd - 1;
    }
    return lineObj;
}
