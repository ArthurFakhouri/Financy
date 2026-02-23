import { gql } from "@apollo/client";

export const LIST_CATEGORIES = gql`
  query ListCategories {
    listCategory {
      id
      title
      description
      icon
      color
      transactions {
        id
        value
      }
      created_at
      updated_at
    }
  }
`