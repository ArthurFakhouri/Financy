import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../DTOs/input/category.input";
import type { User } from "../generated/prisma/client";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { isAuth } from "../middlewares/auth.middleware";
import { CategoryModel } from "../models/category.model";
import type { TransactionModel } from "../models/transaction.model";
import { UserModel } from "../models/user.model";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import { UserService } from "../services/user.service";

@Resolver(() => CategoryModel)
@UseMiddleware(isAuth)
export class CategoryResolver {
  private categoryService = new CategoryService();
  private transactionService = new TransactionService();
  private userService = new UserService();

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @GqlUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.createCategory(data, user.id);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Arg('id', () => String) id: string,
  ): Promise<CategoryModel> {
    return this.categoryService.updateCategory(data, id);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string
  ): Promise<boolean> {
    await this.categoryService.deleteCategory(id)
    return true
  }

  @Query(() => [CategoryModel])
  async listCategory(
    @GqlUser() user: User,
  ): Promise<CategoryModel[]> {
    return this.categoryService.listCategory(user.id);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findUser(transaction.user_id)
  }

  @FieldResolver(() => [TransactionModel])
  async transactions(@Root() category: CategoryModel): Promise<TransactionModel[]> {
    return this.transactionService.findByCategoryId(category.id)
  }
}
