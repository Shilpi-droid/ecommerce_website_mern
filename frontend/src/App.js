import logo from './logo.svg';
import './App.css';
import Header from './components/Header.js';
import { Outlet } from 'react-router-dom';
import toast,{ Toaster } from "react-hot-toast";


function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
 
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`)
      const resData = await res.json()
      dispatch(setDataProduct(resData))
    })()
  },[])
  return (   
    <>
      <Toaster/>
      <div className=''>
        <Header/>
        <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
          <Outlet></Outlet>
        </main>
      </div>
    </>
   
  );
}

export default App;
