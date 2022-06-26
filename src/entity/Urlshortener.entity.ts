import {Column, Entity, Index, ObjectID, ObjectIdColumn, PrimaryColumn} from 'typeorm';

@Entity({name: 'urlshortener'})
export default class Urlshortener {
    @ObjectIdColumn({ name: '_id' })
    id?: ObjectID;    

    @Column()
    url!: string;

    @Column()
    createdAt?: Date;

    @Column()
    updatedAt?: Date;
    
    @Column()
    isActive!: Boolean;
    
    @Column()
    owner!: string;    

    constructor(url: string, createdAt: Date, updatedAt: Date, isActive: Boolean, owner: string) {
        this.url = url;
        this.createdAt = createdAt;        
        this.updatedAt = updatedAt;
        this.isActive = isActive;
        this.owner = owner;
    }

}
