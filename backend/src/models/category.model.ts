import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { TransactionModel } from "./transaction.model";
import { UserModel } from "./user.model";

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String, { nullable: true })
  icon?: string;

  @Field(() => String, { nullable: true })
  color?: string;

  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[]

  @Field(() => String)
  user_id!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => GraphQLISODateTime, { nullable: true })
  created_at?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updated_at?: Date;
}
