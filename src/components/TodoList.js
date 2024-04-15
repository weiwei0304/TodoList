import React, { useReducer, useState, useEffect } from 'react';

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
    case 'initialize':
      return {
        ...state,
        todos: action.payload,
      };
    default:
      throw new Error('action unknown');
  }
}

export default function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 新增狀態
  const [addTodo, setAddTodo] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      dispatch({ type: 'initialize', payload: JSON.parse(storedTodos) });
    }
  }, []);

  //薪增
  const handleAdd = () => {
    if (addTodo.trim() !== '') {
      dispatch({ type: 'add', payload: addTodo });
      setAddTodo('');
      localStorage.setItem(
        'todos',
        JSON.stringify([...state.todos, { id: Date.now(), text: addTodo }])
      );
    } else {
      alert('Please type something...');
    }
  };

  const handleDelete = (id) => {
    dispatch({ type: 'delete', payload: id });
    localStorage.setItem(
      'todos',
      JSON.stringify(state.todos.filter((todo) => todo.id !== id))
    );
  };

  return (
    <div className="flex justify-center">
      <div className="bg-blue-300 px-8 py-4 mt-6 rounded-md">
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
    </div>
  );
}
