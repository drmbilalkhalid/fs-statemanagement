import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useAnecdoteActions, useMessage } from './store'

const App = () => {
  const { initialize } = useAnecdoteActions()
  const message = useMessage()

  useEffect(() => {
    initialize()
  }, [initialize])

  

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification message={message} />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App