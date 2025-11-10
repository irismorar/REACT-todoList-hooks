import { useCallback, useState } from "react";

export function useTodos() {
  const [userInput, setUserInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all"); // "active" , "completed"
  const [isEditingTodoId, setIsEditingTodoId] = useState(null);

  const changeUserInput = useCallback((userText) => {
    setUserInput(userText);
  }, []);

  const createTodo = useCallback(() => {
    if (userInput === "") {
      alert("Invalid text!");
      return;
    }
    const newState = [
      ...todos,
      { id: crypto.randomUUID(), text: userInput.trim(), completed: false },
    ];
    setTodos(newState);
    setUserInput("");
  }, [todos, userInput]);

  const renameTodo = useCallback(
    (todoId, newText) => {
      const afterEditingText = todos.map((todo) => {
        return todo.id === todoId ? { ...todo, text: newText } : todo;
      });
      setTodos(afterEditingText);
    },
    [todos]
  );

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
    setIsEditingTodoId,
    renameTodo,
    isEditingTodoId,
    filteredTodos,
    userInput,
    filter,
    todos,
  };
}
