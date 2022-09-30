export interface Person {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    photoUrl: string;
    birth: Date;
}

export type Persons = Array<Person>;
