const baseURl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseURl)

  if(!response.ok) {
    throw new Error("Couldn't fetch anecdotes")
  }

  return await response.json()
}

const create = async (anecdote) => {
  const response = await fetch(baseURl, {
    method: 'POST',
     headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  })

  if (!response.ok) {
    throw new Error("Couldn't create a new anecdote")
  }

  return await response.json()
}
const update = async (id, anecdote) => {
  const response = await fetch(`${baseURl}/${id}`, {
    method: 'PUT',
     headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote)
  })

  if (!response.ok) {
    throw new Error("Couldn't update the anectode")
  }

  return await response.json()
}

const remove = async (id) => {
  const response = await fetch(`${baseURl}/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    throw new Error("Can't delete this note")
  }

  return await response.json()
}


export default { getAll, create, update, remove }