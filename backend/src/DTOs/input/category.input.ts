import { Field, InputType } from "type-graphql";

@InputType()
export class SaveCategoryInput {
  @Field(() => String)
  title!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String)
  icon: string

  @Field(() => String)
  color: string
}