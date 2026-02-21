import { gql } from '@apollo/client'

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($data: UpdateProfileInput!, $id: String!) {
    updateProfile(data: $data, id: $id) {
      id
      full_name
      email
      created_at
      updated_at
    }
  }
`