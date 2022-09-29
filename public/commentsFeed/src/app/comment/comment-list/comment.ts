export class Comment {
    #id!:number;
    #name!:string;
    #message!:string;
    #created!:string;

    // constructor(name:string,  message:string ){
    //     this.#name = name;
    //     this.#message = message;
    // }

    get id(){
        return this.#id;
    }
    get name(){
        return this.#name;
    }
    get message(){
        return this.#message;
    }
    get created(){
        return this.#created;
    }

    set name(name){
        this.#name=name;
    }
    set message(message){
        this.#message= message;
    }
}
