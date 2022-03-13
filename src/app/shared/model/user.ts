import { Gender } from "../enum/gender";


export class User {
    gender: Gender | null;
    firstName: string;
    lastName: string;
    birthDate: {day: number| null, month:number| null, year:number| null};
    nationality: string | null;

    constructor(){
        this.gender = null;
        this.birthDate = {day:null, month:null, year: null};
        this.firstName = ''
        this.lastName = '';
        this.nationality = null;
    }
}
