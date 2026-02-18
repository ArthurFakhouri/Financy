import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { CreateTransactionInput, SaveTransactionInput, UpdateTransactionInput } from "../DTOs/input/transaction.input";
import type { User } from "../generated/prisma/client";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { isAuth } from "../middlewares/auth.middleware";
import { CategoryModel } from "../models/category.model";
import { TransactionModel } from "../models/transaction.model";
import { UserModel } from "../models/user.model";
import { CategoryService } from "../services/category.service";
import { TransactionService } from "../services/transaction.service";
import { UserService } from "../services/user.service";

@Resolver(() => TransactionModel)
@UseMiddleware(isAuth)
export class TransactionResolver {
  private transactionService = new TransactionService();
  private categoryService = new CategoryService();
  private userService = new UserService();

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @GqlUser() user: User,
  ): Promise<TransactionModel> {
    return this.transactionService.createTransaction(data, user.id);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Arg('id', () => String) id: string,
  ): Promise<TransactionModel> {
    return this.transactionService.updateTransaction(data, id);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string
  ): Promise<boolean> {
    await this.transactionService.deleteTransaction(id)
    return true
  }

  @Query(() => [TransactionModel])
  async listTransaction(): Promise<TransactionModel[]> {
    return this.transactionService.listTransaction();
  }

  @FieldResolver(() => UserModel)
  async user(@Root() transaction: TransactionModel): Promise<UserModel> {
    return this.userService.findUser(transaction.user_id)
  }

  @FieldResolver(() => [CategoryModel])
  async category(@Root() transaction: TransactionModel): Promise<CategoryModel> {
    return this.categoryService.findCategory(transaction.category_id)
  }
}
