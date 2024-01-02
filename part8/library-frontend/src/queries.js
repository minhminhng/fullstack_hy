import { gql } from '@apollo/client'

export const ALL_QUERY = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
    allBooks {
      title
      author
      published
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $published: Int, $author: String!, $genres: [String]) 
  {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
    }
  }
`

export const SET_BIRTHYEAR = gql`
  mutation setBirthYear($name: String!, $setBornTo: Int!) 
  {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`