import { gql } from "@apollo/client";

export const LIST_TRANSACTIONS = gql`
  query ListTransaction {
    listTransaction {
      id
      type
      value
      description
      date
      category {
        id
        title
        description
        icon
        color
        created_at
        updated_at
      }
      created_at
      updated_at
    }
  }
`