import { useCallback, useState } from "react";

export function useTodos() {
  const [userInput, setUserInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // "active" , "completed"

  const changeUserInput = useCallback((userText) => {
    if (userText.trim() === "" || /^[^a-zA-Z0-9]+$/.test(userText.trim())) {
      alert("Invalid text!");
      setUserInput("");
    }
    setUserInput(userText);
  }, []);

  const createTodo = useCallback(() => {
    if (userInput === "") {
      alert("Invalid text!");
      return;
    }
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

  const clearCompletedTodo = useCallback(() => {
    const afterClearCompleted = todos.filter((todo) => {
      return !todo.completed;
    });
    setTodos(afterClearCompleted);
  }, [todos]);

  const setFilterAll = useCallback(() => {
    setFilter("all");
  }, []);

  const setFilterActive = useCallback(() => {
    setFilter("active");
  }, []);

  const setFilterCompleted = useCallback(() => {
    setFilter("completed");
  }, []);

  const filteredTodos = todos.filter((todo) => {
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

  const itemsLeft = useCallback(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  return {
    changeUserInput,
    createTodo,
    toggleCompletedTodo,
    deleteTodo,
    clearCompletedTodo,
    setFilterAll,
    setFilterActive,
    setFilterCompleted,
    itemsLeft,
    filteredTodos,
    userInput,
    todos,
  };
}
