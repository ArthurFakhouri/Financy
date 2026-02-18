import { Field, GraphQLISODateTime, InputType } from "type-graphql";
import { TransactionType } from "../../generated/prisma/enums";

@InputType()
export class CreateTransactionInput {
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

@InputType()
export class UpdateTransactionInput {
  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => GraphQLISODateTime, { nullable: true })
  date?: Date

  @Field(() => Number, { nullable: true })
  value?: number

  @Field(() => String, { nullable: true })
  category_id?: string
}