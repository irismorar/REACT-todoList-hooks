import "./App.css";
import { Todo } from "./Todo";
import { TodoInput } from "./TodoInput";
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
    setIsEditingTodoId,
    renameTodo,
    isEditingTodoId,
    filteredTodos,
    userInput,
    filter,
    todos,
  } = useTodos();

  return (
    <section className="app-container">
      <header>
        <h1>TODOS</h1>
        <TodoInput
          userInput={userInput}
          handleCreateTodo={createTodo}
          handleChangeUserInput={(event) => {
            changeUserInput(event.target.value);
          }}
        />
      </header>
      <main>
        <ul>
          {filteredTodos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                id={todo.id}
                isCompleted={todo.completed}
                text={todo.text}
                handleToggleCompletedTodo={() => {
                  toggleCompletedTodo(todo);
                }}
                handleDeleteTodo={() => {
                  deleteTodo(todo);
                }}
                onEditTodo={() => {
                  setIsEditingTodoId(todo.id);
                }}
                isEditingTodo={todo.id === isEditingTodoId}
                setTodoName={(newText) => {
                  renameTodo(todo.id, newText);
                }}
                setIsEditingTodoId={setIsEditingTodoId}
              />
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
