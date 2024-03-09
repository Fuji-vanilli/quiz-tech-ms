export interface User {
    username?: string,
    email?: string,
    password?: string,
    firstname?: string,
    lastname?: string,
    createdDate?: any,
    lastUpdateDate?: any,
    photo?: string,
    roles?: any[],
    competences?: string[],
    organisations?: any[],
    biography?: string,
    description?: string,
    followers?: number,
    following?: number,
    linkNetwork?: any[];
    subscribers?: any[];
    subscribes?: any[];
    numberOfSubscribes?: number,
    numberOfSubscribers?: number
}