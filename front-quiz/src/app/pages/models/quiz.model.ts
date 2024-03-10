import { Category } from "./category.model";
import { Question } from "./question.model";

export interface Quiz {
    id?: string,
    title?: string,
    description?: string,
    status?:boolean,
    marks?: BigInteger,
    imageUrl?: any,
    numberOfQuestions?: BigInteger, 
    active?: boolean,
    categoryId?: string, 
    difficulty?: string,
    category?: Category, 
    duration?: number, 
    createdBy?: any,
    questions?: Question[]
}