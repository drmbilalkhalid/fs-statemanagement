import { useAnecdoteActions, getId } from "../store";

const AnecdoteForm = () => {
  const { setNewAnecdote } = useAnecdoteActions();

  const createAnecdotes = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    setNewAnecdote({ content, id: getId(), votes: 0 });
    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdotes}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
