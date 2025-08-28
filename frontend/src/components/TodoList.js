import React, { useState } from 'react';

function TodoList({ todos, onDeleteTodo, onToggleTodo, onUpdateTodo, loading }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  const handleSave = async (id) => {
    if (editText.trim() === '') {
      alert('Todo text cannot be empty');
      return;
    }
    
    try {
      await onUpdateTodo(id, editText.trim());
      setEditingId(null);
      setEditText('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      handleSave(id);
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (loading && todos.length === 0) {
    return (
      <div className="todo-list">
        <h2>Your Todos</h2>
        <div className="loading-placeholder">
          <div className="loading-spinner small"></div>
          <p>Loading todos...</p>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="todo-list">
        <h2>Your Todos</h2>
        <div className="no-todos">
          <p>No todos yet. Add one above!</p>
          <p className="no-todos-subtitle">Your todos will be saved permanently in the database</p>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h2>Your Todos ({todos.length})</h2>
      <div className="todos-container">
        {todos.map((todo) => (
          <div 
            key={todo._id} 
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            {/* Completion Toggle */}
            <button
              onClick={() => onToggleTodo(todo._id)}
              className={`toggle-button ${todo.completed ? 'completed' : ''}`}
              aria-label={`Mark todo as ${todo.completed ? 'incomplete' : 'complete'}`}
            >
              {todo.completed ? '✓' : '○'}
            </button>

            {/* Todo Content */}
            <div className="todo-content">
              {editingId === todo._id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, todo._id)}
                    className="edit-input"
                    autoFocus
                  />
                  <div className="edit-actions">
                    <button 
                      onClick={() => handleSave(todo._id)}
                      className="save-button"
                    >
                      Save
                    </button>
                    <button 
                      onClick={handleCancel}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="todo-text-container">
                  <span className="todo-text">{todo.text}</span>
                  <div className="todo-meta">
                    <small className="todo-date">
                      Created: {new Date(todo.createdAt).toLocaleDateString()}
                    </small>
                    {todo.updatedAt !== todo.createdAt && (
                      <small className="todo-updated">
                        Updated: {new Date(todo.updatedAt).toLocaleDateString()}
                      </small>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="todo-actions">
              {editingId !== todo._id && (
                <button
                  onClick={() => handleEdit(todo)}
                  className="edit-button"
                  aria-label={`Edit todo: ${todo.text}`}
                >
                  ✏️
                </button>
              )}
              
              <button
                onClick={() => onDeleteTodo(todo._id)}
                className="delete-button"
                aria-label={`Delete todo: ${todo.text}`}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
