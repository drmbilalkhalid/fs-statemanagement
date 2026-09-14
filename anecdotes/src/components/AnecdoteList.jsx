import { useAnecdotes, useAnecdoteActions, useFilter } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, removeAnecdote } = useAnecdoteActions();
  const filter = useFilter();

  const visibleAnectodes = anecdotes
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()),
    )
    .toSorted((a, b) => b.votes - a.votes);

  return (
    <div>
      {visibleAnectodes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{" "}
            <button onClick={() => vote(anecdote.id)}>vote</button>{" "}
            {anecdote.votes < 1 ? (
              <button onClick={() => removeAnecdote(anecdote.id)}>delete</button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
