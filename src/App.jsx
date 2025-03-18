import './App.css'
import { useEffect } from 'react';
import { useState } from 'react'
import { ThemeProvider } from './Header/ThemeProvider.jsx';
import { Calendar } from 'react-calendar';
function App()

  {
    const [value,setValue]=useState('');
    const[todo, setTodo] =useState([]);
    const [filter, setFilter] = useState('all');
    const [date, setDate] = useState(new Date());

    const [quote, setQuote] = useState('Fetching a quote...');

    useEffect(() => {
      async function fetchQuote() {
        try {
          const response = await fetch('https://dummyjson.com/quotes/random');
          const data = await response.json();
          setQuote(data.quote);
        } catch (error) {
          setQuote('Failed to load quote. Try again later.');
        }
      }
      fetchQuote();
    }, []);
    function addList(e)
    {
      setValue(e.target.value);
    }

    function handleClick()
    {
      if (value.trim() !== '') {
        setTodo([...todo, { text: value, completed: false }]);
        setValue('');
      }
     
    }

    function toggleComplete(index) {
      const newTodo = todo.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      );
      setTodo(newTodo);
    }
  
    function getFilteredTodos() {
      if (filter === 'active') return todo.filter(item => !item.completed);
      if (filter === 'completed') return todo.filter(item => item.completed);
      return todo;
    }
  
    function handleDelete(index) {
      const newTodo = todo.filter((_, i) => i !== index);
      setTodo(newTodo);
    }

    

    
    
    return(
      <>
      <ThemeProvider/>
      {/* Random Quote Section */}
      <div className="quote-container">
        <h3 id="h">✨ Daily Inspiration ✨</h3>
        <p>{quote}</p>
      </div>
         <div className='root'>
         
         
      <div className='to-do'>
        
        <h1> 📒 Todo List</h1>
        <input type='text' placeholder='Write your todos here..' autoFocus value={value} onChange={addList}></input>

        <button className="add"onClick={handleClick}>Add</button>
        <div className='todos'>

          {

            getFilteredTodos().map((v,i)=>(
              
              <div key={i} className='todo-item'>
               <input type='checkbox' checked={v.completed}
               onChange={()=>toggleComplete(i)}></input>
                <span className={v.completed ? 'completed' : ''}>{v.text}</span>
                <button id="d" className="delete-btn "onClick={()=>handleDelete(i)}> ❌ </button> 
                </div>
                
                ))}
        </div>

         <div className='filters'>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <div className='left-items'>
        <span id="last">{todo.filter(item => !item.completed).length} item(s) left</span>
      </div>

      

      </div>
      {/* Right Side: Calendar */}
      <div className="calendar-container">
        <h2>📅 Calendar 2025</h2>
        <Calendar onChange={setDate} value={date} />
        <p className='para'>Selected Date: {date.toDateString()}</p>
      </div>
      
       
        
      
    </div>
    <footer className="footer">
  <p>🕒 {new Date().toLocaleTimeString()} | 📅 {new Date().toDateString()}</p>
  <p>✨ "Stay productive. One task at a time!" ✨</p>
  <div className="social-icons">
    <a href="https://github.com" target="_blank" rel="noopener noreferrer">🌍 GitHub</a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>
  </div>
</footer>
    </>
    )

  }


export default App;