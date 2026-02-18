import { registerEnumType } from "type-graphql";
import { TransactionType } from "../generated/prisma/enums";

registerEnumType(TransactionType, {
  name: "TransactionType",
});
