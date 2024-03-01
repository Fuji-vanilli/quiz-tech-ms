import { User } from "./user.model";

export interface Result {
    id?: string,
    quizId?: string,
    rate?: number,
    user?: User
}