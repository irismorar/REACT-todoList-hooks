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
  } = useTodos();

  console.log(filteredTodos);

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
                    checked={todo.completed}
                    onChange={() => toggleCompletedTodo(todo)}
                  />
                  <label
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                      opacity: todo.completed ? ".7" : "1",
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
        {!!itemsLeft() && (
          <footer>
            <section className="remaining-todos-container">
              {itemsLeft()} {itemsLeft() <= 1 ? " item" : " items"} left
            </section>
            <section className="filters-container">
              <button onClick={setFilterAll}>All</button>
              <button onClick={setFilterActive}>Active</button>
              <button onClick={setFilterCompleted}>Completed</button>
            </section>
            <div onClick={clearCompletedTodo}>Clear completed</div>
          </footer>
        )}
      </main>
    </section>
  );
}
