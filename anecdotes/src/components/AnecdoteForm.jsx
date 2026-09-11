import { useNewAncedote, getId } from "../store";

const AnecdoteForm = () => {
  const newAnectode = useNewAncedote();

  const createAnecdotes = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    newAnectode({ content, id: getId(), votes: 0 });
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
