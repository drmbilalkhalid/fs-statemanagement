import { useAnecdotes, useAnecdoteActions, useFilter } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { setVote } = useAnecdoteActions();
  const filter = useFilter()

  const visibleAnectodes = anecdotes
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .toSorted((a, b) => b.votes - a.votes)

  return (
    <div>
      {visibleAnectodes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => setVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
