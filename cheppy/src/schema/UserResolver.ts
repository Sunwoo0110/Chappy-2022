import 'reflect-metadata';
import {Resolver, Query, Mutation, Arg} from 'type-graphql';
import {User} from './User';
import { getUserInfo } from './userDB';

@Resolver()
export class UserResolver {
    @Query(() => [User])
    showUserInfo(): User[]{
      return getUserInfo();
    }
}
