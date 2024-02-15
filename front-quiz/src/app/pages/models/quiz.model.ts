import { Category } from "./category.model";

export interface Quiz {
    id?: string,
    title?: string,
    description?: string,
    marks?: BigInteger,
    numberOfQuestions?: BigInteger,
    active?: boolean,
    categoryId?: string,
    category?: Category
    duration?: number
}