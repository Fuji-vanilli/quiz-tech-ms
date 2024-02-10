import { Category } from "./category.model";

export interface Quiz {
    id?: string,
    title?: string,
    description?: string,
    marks?: BigInteger,
    numberOfQuestions?: BigInteger,
    active?: boolean,
    category?: Category
}