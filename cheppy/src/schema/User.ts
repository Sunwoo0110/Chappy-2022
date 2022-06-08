import {ObjectType, Field, ID, Int} from "type-graphql"

@ObjectType()
export class User{
    @Field(()=>ID)
    userid!: string;

    @Field()
    password!: string;

    @Field()
    email!: string;

    @Field()
    username!: string;

    @Field()
    cellnumber!: string;

    @Field()
    department!: string;

    @Field(()=>Int)
    usertype!: number;

    @Field(()=>Int)
    semester!: number;
}
