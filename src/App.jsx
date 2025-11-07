import "./App.css";
import { useTodos } from "./useTodos";

export default function App() {
  const {
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
    filter,
    todos,
  } = useTodos();

  return (
    <section className="app-container">
      <header>
        <h1>TODOS</h1>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={userInput}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              createTodo();
            }
          }}
          onChange={(event) => {
            changeUserInput(event.target.value);
          }}
        />
      </header>
      <main>
        <ul>
          {filteredTodos.map((todo) => {
            return (
              <li key={todo.id}>
                <div>
                  <input
                    type="checkbox"
                    id={todo.id}
                    checked={todo.completed}
                    onChange={() => toggleCompletedTodo(todo)}
                  />
                  <label
                    htmlFor={todo.id}
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      opacity: todo.completed ? ".4" : "1",
                    }}
                  >
                    {todo.text}
                  </label>
                </div>
                <button
                  className="delete-todo-button"
                  onClick={() => deleteTodo(todo)}
                >
                  ❌
                </button>
              </li>
            );
          })}
        </ul>
        {!!todos.length && (
          <footer>
            <section className="remaining-todos-container">
              {itemsLeft()} {itemsLeft() <= 1 ? " item" : " items"} left
            </section>
            <section className="filters-container">
              <button
                onClick={setFilterAll}
                style={{
                  backgroundColor:
                    filter === "all" ? "hsla(0,0%,100%,.2)" : "transparent",
                }}
              >
                All
              </button>
              <button
                onClick={setFilterActive}
                style={{
                  backgroundColor:
                    filter === "active" ? "hsla(0,0%,100%,.2)" : "transparent",
                }}
              >
                Active
              </button>
              <button
                onClick={setFilterCompleted}
                style={{
                  backgroundColor:
                    filter === "completed"
                      ? "hsla(0,0%,100%,.2)"
                      : "transparent",
                }}
              >
                Completed
              </button>
            </section>
            <div onClick={clearCompletedTodo}>Clear completed</div>
          </footer>
        )}
      </main>
    </section>
  );
}
