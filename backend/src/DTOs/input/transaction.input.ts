import { Field, GraphQLISODateTime, InputType } from "type-graphql";
import { TransactionType } from "../../generated/prisma/enums";

@InputType()
export class SaveTransactionInput {
  @Field(() => TransactionType)
  type: TransactionType

  @Field(() => String)
  description!: string

  @Field(() => GraphQLISODateTime)
  date: Date

  @Field(() => Number)
  value: number

  @Field(() => String)
  category_id: string
}