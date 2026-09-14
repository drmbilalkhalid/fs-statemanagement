import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { addAnecdote, setMessage } = useAnecdoteActions();

  const createAnecdotes = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    addAnecdote(content)
    setMessage(`New Anecdote '${content}' Added`)
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
