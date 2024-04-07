import { Category } from "./category.model";
import { Question } from "./question.model";

export interface Quiz {
    id?: string,
    title?: string,
    description?: string,
    status?:boolean,
    marks?: number,
    imageUrl?: any,
    numberOfQuestions?: BigInteger, 
    active?: boolean,
    categoryId?: string, 
    difficulty?: string,
    category?: Category, 
    duration?: number, 
    createdBy?: any,
    language?: string,
    finish?: boolean,
    createdDate?: Date,
    lastUpdateDate?: Date,
    photo?: any,
    questions?: Question[]
}