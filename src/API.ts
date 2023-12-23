import { shuffleArray } from "./utils";

//* Type for the object delivered to Application. This is to ensure we are accepting the correct Object format.
export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}
//* Type for the final Question Card. Here the answers type is used to store all the answer options for each of the questions.
export type QuestionsState = Question & { answers: string[] };

//* To set the type for the Question difficulty to use for the Quiz
export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}
//* Function to do API call to get the Questions Based on Number and Difficulty. 
export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint =  `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();

    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
    })) //* Creating property to generate all the options for multiple choice Questions
}