import { VStack, Spinner } from '@chakra-ui/react'
import TodoItem from './TodoItem'
import TotalCount from './TotalCount'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_TODOS, DEL_TODO, UPDATE_TODO } from '../apollo/todos'

const TodoList = () => {
  const { data, loading, error } = useQuery(ALL_TODOS)
  const [toggleTodo, {error: updateError, loading: updateLoading}] = useMutation(UPDATE_TODO)
  const [delTodo, {error: delTodoError, loading: delLoading}] = useMutation(DEL_TODO, {
    update(cache, {data: {removeTodo}}) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(todo => todo.__ref !== `Todo:${removeTodo.id}`)
          }
        }
      })
    }
  })

  if(loading || updateLoading || delLoading) {
    return <Spinner />
  }

  if(error || updateError || delTodoError) {
    return <h3>Error...</h3>
  }

  return (
    <>
      <VStack spacing={2} mt={4}>
        {data.todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} delTodo={delTodo} />
        ))}
      </VStack>
      <TotalCount />
    </>
  )
}

export default TodoList
