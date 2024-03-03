import { Quiz } from "./quiz.model";

export interface Result {
    id?: string,
    quizId?: string,
    rate?: any,
    frequency?: number,
    emailUser?: string
    quiz?: Quiz
    active?: boolean,
    createdDate?: any
}