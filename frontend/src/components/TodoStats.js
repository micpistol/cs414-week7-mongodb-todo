import React from 'react';

function TodoStats({ totalTodos, completedTodos, pendingTodos }) {
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  return (
    <div className="todo-stats">
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-number">{totalTodos}</div>
          <div className="stat-label">Total Todos</div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-number">{completedTodos}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card pending">
          <div className="stat-number">{pendingTodos}</div>
          <div className="stat-label">Pending</div>
        </div>
        
        <div className="stat-card rate">
          <div className="stat-number">{completionRate}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>
      
      {totalTodos > 0 && (
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default TodoStats;
