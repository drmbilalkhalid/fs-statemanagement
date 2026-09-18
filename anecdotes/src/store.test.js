import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    update: vi.fn(),
    create: vi.fn(),
  },
}));

import anecdoteService from "./services/anecdotes";
import useAnecdoteStore, {
  useAnecdoteActions,
  useAnecdotes
} from "./store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "", message: "" });
  vi.clearAllMocks();
});

describe("testing state store", () => {
  it("initialize anectodes from service", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test tod", votes: 5 }];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: resultAnecdotes } = renderHook(() => useAnecdotes());
    expect(resultAnecdotes.current).toStrictEqual(mockAnecdotes);
  });

  it("store gives the sorted anecdotes by votes to displaying component", () => {
    const mockAnecdotes = [
      { id: 2, content: "Test tod 2", votes: 2 },
      { id: 1, content: "Test tod", votes: 5 },
      { id: 3, content: "Test tod 3", votes: 1 },
    ];
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes });

    const { result: resultAnecdotes } = renderHook(() => useAnecdotes());
    expect(resultAnecdotes.current.map((a) => a.votes)).toStrictEqual([
      5, 2, 1,
    ]);
    expect(
      useAnecdoteStore.getState().anecdotes.map((a) => a.votes),
    ).toStrictEqual([2, 5, 1]); //original anecdotes inside store is not mutated
  });

  it("store gives properly filtered list of anecdotes", () => {
    const mockAnecdotes = [
      {
        id: 2,
        content: "Adding manpower to a late software project makes it later!",
        votes: 2,
      },
      {
        id: 1,
        content: "Premature optimization is the root of all evil.",
        votes: 5,
      },
      { id: 3, content: "If it hurts, do it more often", votes: 1 },
    ];
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: "man" });

    const { result } = renderHook(() => useAnecdotes());
    expect(result.current).toHaveLength(1);
    expect(result.current).toStrictEqual([mockAnecdotes[0]]);
  });

  it("voting increases the number of votes for an anecdote", async () => {
    const mockAnecdotes = [
      {
        id: 1,
        content: "Adding manpower to a late software project makes it later!",
        votes: 2,
      },
    ];
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes });

    anecdoteService.update.mockResolvedValue({
      id: 1,
      content: "Adding manpower to a late software project makes it later!",
      votes: 3,
    });

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.vote(1);
    });

    const { result: resultedAnecdotes } = renderHook(() => useAnecdotes());
    expect(resultedAnecdotes.current[0].votes).toBe(3);
    expect(anecdoteService.update).toHaveBeenCalledTimes(1);
    expect(anecdoteService.update).toHaveBeenCalledWith(1, {
      id: 1,
      content: "Adding manpower to a late software project makes it later!",
      votes: 3,
    });
  });
});
