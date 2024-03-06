export interface User {
    username?: string,
    email?: string,
    password?: string,
    firstname?: string,
    lastname?: string,
    createdDate?: any,
    lastUpdateDate?: any,
    photo?: string,
    competences?: string[],
    organisations?: any[],
    biography?: string,
    description?: string,
    followers?: number,
    following?: number,
    linkNetwork?: any[];
}