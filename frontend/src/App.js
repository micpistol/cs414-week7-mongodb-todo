import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:3001/api';

  // Fetch all todos from MongoDB
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError('Error fetching todos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new todo in MongoDB
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newTodo.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      const createdTodo = await response.json();
      setTodos([createdTodo, ...todos]);
      setNewTodo('');
    } catch (err) {
      setError('Error creating todo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete todo from MongoDB
  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Error deleting todo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 Todo List with MongoDB</h1>
        <p>Full-Stack Application - CS 414 Assignment</p>
      </header>

      <main className="App-main">
        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new todo..."
            className="todo-input"
            disabled={loading}
          />
          <button type="submit" className="todo-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Todo'}
          </button>
        </form>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {/* Todo List */}
        <div className="todo-list">
          {loading && todos.length === 0 ? (
            <div className="loading">Loading todos...</div>
          ) : todos.length === 0 ? (
            <div className="no-todos">No todos yet. Add one above!</div>
          ) : (
            todos.map((todo) => (
              <div key={todo._id} className="todo-item">
                <span className="todo-text">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="delete-button"
                  disabled={loading}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Todo Count */}
        {todos.length > 0 && (
          <div className="todo-count">
            Total todos: {todos.length}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
