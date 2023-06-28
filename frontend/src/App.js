import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import { Outlet } from 'react-router-dom';


function App() {
  return (   
   <div className=''>
    <Header/>
    <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
      <Outlet></Outlet>
    </main>
    </div>
  );
}

export default App;
