import { gql } from '@apollo/client'

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      type
      value
      description
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

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($data: UpdateTransactionInput!, $id: String!) {
    updateTransaction(data: $data, id: $id) {
      id
      type
      value
      description
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

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: String!) {
    deleteTransaction(id: $id)
  }
`