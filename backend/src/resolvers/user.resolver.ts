import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { CreateUserInput } from "../DTOs/input/user.input";
import { isAuth } from "../middlewares/auth.middleware";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver(() => UserModel)
@UseMiddleware(isAuth)
export class UserResolver {
  private userService = new UserService();

  @Mutation(() => UserModel)
  async createUser(
    @Arg('data', () => CreateUserInput) data: CreateUserInput
  ): Promise<UserModel> {
    return this.userService.createUser(data)
  }

  @Query(() => UserModel)
  async getUser(
    @Arg('id', () => String) id: string
  ): Promise<UserModel> {
    return this.userService.findUser(id)
  }
}
