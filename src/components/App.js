import Header from './Header';
import TodoList from './TodoList';

export default function App() {
  return (
    <>
      <div className="flex justify-center mt-8">
        <div className="rounded-md bg-gradient-to-b from-blue-300 to bg-purple-200 w-full max-w-xl">
          <Header />
          <TodoList />
        </div>
      </div>
    </>
  );
}
