import { Button, FormControl, Input, Spinner } from '@chakra-ui/react'
import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ADD_TODO, ALL_TODOS } from '../apollo/todos'

const AddTodo = () => {
  const [text, setText] = useState('')
  const [addTodo, { data, error, loading }] = useMutation(ADD_TODO, {
    // refetchQueries: [
    //   {query: ALL_TODOS}
    // ]
    update(cache, {data: {newTodo}}) {
      const {todos} = cache.readQuery({query: ALL_TODOS})

      cache.writeQuery({
        query: ALL_TODOS,
        data: {
          todos: [...todos, newTodo]
        }
      })
    }
  })

  const handleAddTodo = () => {
    if (text.trim().length) {
      addTodo({ variables: {
        title: text, userId: 2, completed: false
      }})
      setText('')
    }
  }

  const handleKey = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo()
    }
  }

  if(loading) {
    return <Spinner />
  }

  if (error) {
    return <h3>Error...</h3>
  }

  return (
    <FormControl display={'flex'} mt={6}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKey}
      />
      <Button onClick={handleAddTodo}>Add todo</Button>
    </FormControl>
  )
}

export default AddTodo
