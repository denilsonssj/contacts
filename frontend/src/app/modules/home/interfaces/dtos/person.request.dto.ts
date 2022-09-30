export interface PersonCreateRequestDto {
    fullName: string;
    email: string;
    phone: string;
    birth: Date;
}

export interface PersonUpdateRequestDto {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    birth: Date;
}