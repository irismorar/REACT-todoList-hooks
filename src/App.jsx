import "./App.css";
import { useTodo } from "./useTodo";

export default function App() {
  const [
    changeUserInput,
    createTodo,
    toggleCompletedTodo,
    // deleteTodo,
    // setFilterAll,
    // setFilterActive,
    // setFilterCompleted,
    filteredTodos,
    userInput,
    // todos,
    // filter,
  ] = useTodo();

  return (
    <section className="app_container">
      <header>
        <h1>todos</h1>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={userInput}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              createTodo;
            }
          }}
          onChange={(event) => changeUserInput(event)}
        />
      </header>
      <main>
        <ul>
          {filteredTodos.current.map((todo) => {
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
              </li>
            );
          })}
        </ul>
      </main>
    </section>
  );
}
