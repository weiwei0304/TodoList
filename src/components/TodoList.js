import React, { useReducer, useState } from 'react';

// todolist初始狀態

const initialState = {
  todos: [{ id: 1, text: 'Learn React' }],
};

function reducer(state, action) {
  switch (action.type) {
    //新增
    case 'add':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload }],
      };
    // 删除
    case 'delete':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      throw new Error('action unknown');
  }
}

export default function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 新增狀態
  const [addTodo, setAddTodo] = useState('');

  //薪增
  const handleAdd = () => {
    dispatch({ type: 'add', payload: addTodo });
  };

  const handleDelete = (id) => {
    dispatch({ type: 'delete', payload: id });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {state.todos.map((todo, i) => (
          <li key={todo.id}>
            <input type="checkbox" />
            {todo.text}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={addTodo}
          onChange={(e) => setAddTodo(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}
