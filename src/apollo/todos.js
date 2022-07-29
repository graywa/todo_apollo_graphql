import { gql } from '@apollo/client'

export const ALL_TODOS = gql`
  query getAllTodos {
    todos: allTodos {
      id
      title
      completed
    }
  }
`

export const ADD_TODO = gql`
  mutation addTodo($title: String!, $userId: ID!, $completed: Boolean!) {
    newTodo: createTodo(
      title: $title
      user_id: $userId
      completed: $completed
    ) {
      title
      user_id
      completed
    }
  }
`

export const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $completed: Boolean) {
    updateTodo(id: $id, completed: $completed) {
      id
      title
      completed
    }
  }
`

export const DEL_TODO = gql`
  mutation delTodo($id: ID!) {
    removeTodo(id: $id) {
      id
      title
    }
  }
`
