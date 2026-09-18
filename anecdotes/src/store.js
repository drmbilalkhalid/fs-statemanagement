import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  message: "",
  actions: {
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set({ anecdotes });
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find((an) => an.id === id);
      if (!anecdote) return;
      const updatedAnecdote = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes.map((an) =>
          an.id === id ? updatedAnecdote : an,
        ),
      }));
      get().actions.setMessage(`you voted '${anecdote.content}'`);
    },
    addAnecdote: async (content) => {
      const newAnecdote = await anecdoteService.create({ content, votes: 0 });
      set((state) => ({ anecdotes: state.anecdotes.concat(newAnecdote) }));
    },
    setFilter: (filter) => set({ filter }),
    setMessage: (message) => {
      set({ message });
      setTimeout(() => {
        set({ message: "" });
      }, 5000);
    },
    removeAnecdote: async (id) => {
      const anecdote = get().anecdotes.find((an) => an.id === id);
      if (anecdote && anecdote.votes === 0) {
        await anecdoteService.remove(id);
        set((state) => ({
          anecdotes: state.anecdotes.filter((an) => an.id !== id),
        }));
        get().actions.setMessage(``)
      }
    },
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useFilter()
  const visibleAnecdotes =  anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  ).toSorted((a, b) => b.votes - a.votes);
  return visibleAnecdotes;

};
export const useFilter = () => useAnecdoteStore((state) => state.filter);
export const useMessage = () => useAnecdoteStore((state) => state.message);
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
export default useAnecdoteStore;