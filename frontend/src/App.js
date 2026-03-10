import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all todos on load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data);
      setLoading(false);
    } catch (err) {
      setError('Cannot connect to backend. Is it running?');
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post(`${API}/todos`, { title: input });
      setTodos([res.data, ...todos]);
      setInput('');
    } catch (err) {
      setError('Failed to add todo.');
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const res = await axios.put(`${API}/todos/${id}`, { completed: !completed });
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      setError('Failed to update todo.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      setError('Failed to delete todo.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Todo App</h1>
      <p style={styles.subtitle}>React + Node.js + MongoDB | Jenkins Practice</p>

      {/* Add Todo */}
      <div style={styles.inputRow}>
        <input
          style={styles.input}
          type="text"
          placeholder="Add a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button style={styles.addBtn} onClick={addTodo}>Add</button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {/* Todo List */}
      {loading ? (
        <p style={styles.info}>Loading...</p>
      ) : todos.length === 0 ? (
        <p style={styles.info}>No todos yet. Add one above!</p>
      ) : (
        <ul style={styles.list}>
          {todos.map((todo) => (
            <li key={todo._id} style={styles.item}>
              <span
                style={{
                  ...styles.todoText,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#aaa' : '#222',
                }}
                onClick={() => toggleTodo(todo._id, todo.completed)}
              >
                {todo.completed ? '✅' : '⬜'} {todo.title}
              </span>
              <button
                style={styles.deleteBtn}
                onClick={() => deleteTodo(todo._id)}
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}

      <p style={styles.count}>{todos.filter((t) => !t.completed).length} remaining</p>
    </div>
  );
}

const styles = {
  container: { maxWidth: 500, margin: '60px auto', fontFamily: 'Arial, sans-serif', padding: '0 20px' },
  title:     { fontSize: 32, textAlign: 'center', marginBottom: 4 },
  subtitle:  { textAlign: 'center', color: '#888', marginBottom: 24, fontSize: 13 },
  inputRow:  { display: 'flex', gap: 8, marginBottom: 16 },
  input:     { flex: 1, padding: '10px 14px', fontSize: 16, border: '2px solid #ddd', borderRadius: 8, outline: 'none' },
  addBtn:    { padding: '10px 20px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 16 },
  list:      { listStyle: 'none', padding: 0 },
  item:      { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', marginBottom: 8, background: '#f9f9f9', borderRadius: 8, border: '1px solid #eee' },
  todoText:  { cursor: 'pointer', fontSize: 16, flex: 1 },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 },
  error:     { color: 'red', marginBottom: 12 },
  info:      { textAlign: 'center', color: '#888' },
  count:     { textAlign: 'center', color: '#aaa', marginTop: 20, fontSize: 13 },
};

export default App;
