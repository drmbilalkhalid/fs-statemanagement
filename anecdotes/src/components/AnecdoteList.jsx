import { useAnecdotes, useAnecdoteActions } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, removeAnecdote } = useAnecdoteActions();

  return (
    <div>
      {anecdotes.map((anecdote) => (
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
