import React, { useReducer, useState, useEffect } from 'react';
import Button from './Button';
import Percentage from './Percentage';
import Switch from './Switch';

// todolist初始狀態
const initialState = {
  todos: [],
  moveCompleted: false,
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

    case 'toggleSwitch':
      return {
        ...state,
        moveCompleted: !state.moveCompleted,
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
  //已完成todos的數量
  const [completedTodos, setCompletedTodos] = useState(0);

  const [moveCompleted, setMoveCompleted] = useState(false);

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
    const updatedTodos = state.todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  //checkbox
  const handleToggle = (id) => {
    dispatch({ type: 'toggle', payload: id });
    localStorage.setItem(
      'todos',
      JSON.stringify(
        state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      )
    );
  };

  const handleToggleSwitch = () => {
    dispatch({ type: 'toggleSwitch' });
    setMoveCompleted(!moveCompleted);
    localStorage.setItem('moveCompleted', JSON.stringify(!moveCompleted));
  };

  useEffect(() => {
    const completedCount = state.todos.filter((todo) => todo.completed).length;
    setCompletedTodos(completedCount);
  }, [state.todos]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      dispatch({ type: 'initialize', payload: JSON.parse(storedTodos) });
    }

    const storedMoveCompleted = localStorage.getItem('moveCompleted');
    if (storedMoveCompleted) {
      dispatch({ type: 'toggleSwitch' });
    }
  }, []);

  //完成率
  const completedPercentage = Math.round(
    (completedTodos / state.todos.length) * 100
  );

  const storedTodos = moveCompleted
    ? [
        ...state.todos.filter((todo) => !todo.completed),
        ...state.todos.filter((todo) => todo.completed),
      ]
    : state.todos;

  return (
    <div className="px-4 pb-6">
      <Percentage value={completedPercentage} />
      <ul className="flex flex-col gap-2">
        {storedTodos.map((todo, i) => (
          <li key={todo.id}>
            <div className="bg-white w-full h-12 flex justify-between items-center rounded-md px-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="mr-4 w-5 h-5 accent-blue-500"
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
      <div className="mt-3 border-b border-red-300"></div>
      <div className="text-right mt-3">
        <Switch onChange={handleToggleSwitch} />
      </div>
      <div>
        <p>Add to list</p>
        <div className="flex items-center">
          <input
            type="text"
            value={addTodo}
            onChange={(e) => setAddTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAdd();
              }
            }}
            className="py-2 px-2 rounded-md w-full"
          />
          <Button type={'add'} onClick={() => handleAdd()} />
        </div>
      </div>
    </div>
  );
}
