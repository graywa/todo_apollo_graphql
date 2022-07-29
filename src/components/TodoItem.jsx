import { Checkbox, Text, CloseButton, HStack } from '@chakra-ui/react'

const TodoItem = ({ id, title, completed, toggleTodo, delTodo }) => {
  const toogleHandler = () => {
    toggleTodo({
      variables: {
        id,
        completed: !completed,
      },
    })
  }

  const delTodoHandler = () => {
    delTodo({
      variables: {
        id
      }
    })
  }

  return (
    <HStack spacing={3}>
      <Checkbox isChecked={completed} onChange={toogleHandler} />
      <Text>{title}</Text>
      <CloseButton onClick={delTodoHandler} />
    </HStack>
  )
}

export default TodoItem
