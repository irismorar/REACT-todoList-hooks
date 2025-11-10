export function Todo({
  id,
  isCompleted,
  text,
  handleToggleCompletedTodo,
  handleDeleteTodo,
  onEditTodo,
  isEditingTodo,
  setTodoName,
  setIsEditingTodoId,
}) {
  if (isEditingTodo) {
    return (
      <li>
        <input
          type="text"
          value={text}
          onChange={(event) => {
            setTodoName(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setIsEditingTodoId(null);
            }
          }}
        />
      </li>
    );
  }

  return (
    <li onDoubleClick={onEditTodo}>
      <div>
        <input
          type="checkbox"
          id={id}
          checked={isCompleted}
          onChange={handleToggleCompletedTodo}
        />
        <label
          htmlFor={id}
          style={{
            textDecoration: isCompleted ? "line-through" : "none",
            opacity: isCompleted ? ".4" : "1",
          }}
        >
          {text}
        </label>
      </div>
      <button className="delete-todo-button" onClick={handleDeleteTodo}>
        ❌
      </button>
    </li>
  );
}
