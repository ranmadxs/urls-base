import {Column, Entity, Index, ObjectID, ObjectIdColumn} from 'typeorm';

@Entity({name: 'urlshortener'})
export default class Urlshortener {
    @ObjectIdColumn()
    _id?: ObjectID;

    @Column()
    url!: string;

    @Column()
    createdAt?: Date;

    @Column()
    updatedAt?: Date;
    
    @Column()
    status!: Boolean;
    
    @Column()
    owner!: string;    

    constructor(url: string, createdAt: Date, updatedAt: Date, status: Boolean, owner: string) {
        this.url = url;
        this.createdAt = createdAt;        
        this.updatedAt = updatedAt;
        this.status = status;
        this.owner = owner;
    }

}
