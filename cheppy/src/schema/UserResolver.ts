import 'reflect-metadata';
import {Resolver, Query, Mutation, Arg} from 'type-graphql';
import {User} from './User';
import { getUserInfo, signUpUser } from './userDB';

@Resolver()
export class UserResolver {
    @Query(() => [User])
    showUserInfo(): User[]{
      return getUserInfo();
    }

    @Mutation(() => [User])
    async signUpUser(
      @Arg('userid') userid: string,
      @Arg('password') password: string,
      @Arg('username') username: string,
      @Arg('email') email: string,
    ): Promise<User[]>{
      signUpUser(userid, password, username, email);
      return getUserInfo();
    }
}
