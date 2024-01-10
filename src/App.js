// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home'; 
import About from './components/About'; 
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert message="This is an alert"/>
        <div className='container'>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
