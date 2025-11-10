export function TodoInput({
  userInput,
  handleCreateTodo,
  handleChangeUserInput,
}) {
  return (
    <input
      type="text"
      placeholder="What needs to be done?"
      value={userInput}
      onKeyUp={(event) => {
        if (event.key === "Enter") {
          handleCreateTodo();
        }
      }}
      onChange={handleChangeUserInput}
    />
  );
}
