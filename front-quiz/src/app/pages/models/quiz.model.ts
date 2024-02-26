import { Category } from "./category.model";
import { Question } from "./question.model";

export interface Quiz {
    id?: string,
    title?: string,
    description?: string,
    marks?: BigInteger,
    imageUrl?: any,
    numberOfQuestions?: BigInteger, 
    active?: boolean,
    categoryId?: string, 
    category?: Category, 
    duration?: number, 
    questions?: Question[]
}