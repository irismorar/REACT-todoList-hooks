import { useCallback, useState, useRef } from "react";

export function useTodo() {
  const [userInput, setUserInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // "active" , "completed"
  const filteredTodos = useRef(null);

  const changeUserInput = useCallback((event) => {
    setUserInput(event.target.value);
  }, []);

  const createTodo = useCallback(() => {
    const newState = [
      ...todos,
      { id: crypto.randomUUID(), text: userInput, completed: false },
    ];
    setTodos(newState);
    setUserInput("");
  }, [todos, userInput]);

  const toggleCompletedTodo = useCallback(
    (item) => {
      const afterToggleCompletedTodo = todos.map((todo) => {
        return item.id === todo.id
          ? { ...todo, completed: !todo.completed }
          : todo;
      });
      setTodos(afterToggleCompletedTodo);
    },
    [todos]
  );

  const deleteTodo = useCallback(
    (item) => {
      const afterDeletingTodo = todos.filter((todo) => {
        return item.id !== todo.id;
      });
      setTodos(afterDeletingTodo);
    },
    [todos]
  );

  const setFilterAll = useCallback(() => {
    setFilter("all");
  }, []);

  const setFilterActive = useCallback(() => {
    setFilter("active");
  }, []);

  const setFilterCompleted = useCallback(() => {
    setFilter("completed");
  }, []);

  filteredTodos.current = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    }
    if (filter === "active") {
      return !todo.completed;
    }
    if (filter === "completed") {
      return todo.completed;
    }
  });

  return [
    changeUserInput,
    createTodo,
    toggleCompletedTodo,
    deleteTodo,
    setFilterAll,
    setFilterActive,
    setFilterCompleted,
    filteredTodos,
    userInput,
    todos,
    filter,
  ];
}
