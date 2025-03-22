import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUp from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import YourData from './components/YourData';
import HeartState from './context/heart/HeartState';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="App">
      <HeartState>
      <Router>
      <Navbar />
      
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/signup' element={<SignUp />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/open' element={<YourData />}/>
        <Route exact path='/about' element={<About />}/>
        <Route exact path='/contact' element={<Contact />}/>
      </Routes>
      </Router>
      </HeartState>
    </div>
  );
}

export default App;
