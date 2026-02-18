import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import { TransactionType } from "../generated/prisma/enums";
import { CategoryModel } from "./category.model";
import { UserModel } from "./user.model";

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  description!: string;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => Number)
  value!: number;

  @Field(() => String)
  user_id!: string;

  @Field(() => UserModel, { nullable: true })
  user?: UserModel;

  @Field(() => String)
  category_id: string;

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel;

  @Field(() => GraphQLISODateTime, { nullable: true })
  created_at?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updated_at?: Date;
}
