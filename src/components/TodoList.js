import React, { useReducer, useState, useEffect } from 'react';
import Button from './Button';
import Percentage from './Percentage';

// todolist初始狀態
const initialState = {
  todos: [],
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

    //勾選
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    //初始化
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

  //新增
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

  //刪除
  const handleDelete = (id) => {
    dispatch({ type: 'delete', payload: id });
    localStorage.setItem(
      'todos',
      JSON.stringify(state.todos.filter((todo) => todo.id !== id))
    );
  };

  //checkbox
  const handleToggle = (id) => {
    dispatch({ type: 'toggle', payload: id });
    localStorage.setItem(
      'todos',
      JSON.stringify(
        state.todos.map((todo) =>
          todo.id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    );
  };

  return (
    <div className="px-4 pb-6">
      <Percentage />
      <ul className="flex flex-col gap-2">
        {state.todos.map((todo, i) => (
          <li key={todo.id}>
            <div className="bg-gray-100 w-full h-12 flex justify-between items-center rounded-md px-4">
              <div className="flex">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="mr-4"
                />
                <span className={todo.completed ? 'line-through' : ''}>
                  {todo.text}
                </span>
              </div>
              <div className="flex items-center">
                <Button type={'delete'} onClick={() => handleDelete(todo.id)} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <p>Add to list</p>
        <div className="flex items-center">
          <input
            type="text"
            value={addTodo}
            onChange={(e) => setAddTodo(e.target.value)}
            className="py-2 px-2 rounded-md w-full"
          />
          <Button type={'add'} onClick={() => handleAdd()} />
        </div>
      </div>
    </div>
  );
}
