export type IUserType = 'OWNER' | 'STUDENT';

export interface IUser {
    id?: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate?: string;
    avatar?: string;
    type: IUserType;
}
