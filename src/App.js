
import Home from './pages/Home';
import Upload from './pages/Upload';
import Update  from './pages/Update';
import Admin from './pages/Admin';
import NavBar from './components/Navbar'
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import {useState} from 'react';
function App() {
  const [user,setUser] = useState('')
  return (
   
       <Router>
         <NavBar user={user} setUser={setUser} />
        <Switch>
          <Route exact path="/">
            <Home user={user} setUser={setUser} />
          </Route>
          <Route  exact path="/upload">
            <Upload user={user} setUser={setUser}/>
          </Route>
          <Route  exact path="/admin">
            <Admin user={user} setUser={setUser}/>
          </Route>
          <Route  exact path="/update/:id">
            <Update user={user} setUser={setUser} />
          </Route>
        </Switch>
     
    </Router>
 
  );
}

export default App;
