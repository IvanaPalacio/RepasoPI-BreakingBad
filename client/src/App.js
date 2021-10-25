import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import CharacterCreate from './components/CharacterCreate/CharacterCreate';
//el Switch solo se mueve solo dentro de lo que están envolviendo, es buena práctica.
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch> 
    <Route exact path = '/' component={LandingPage}/>
    <Route path = '/home' component={Home}/>
    <Route path = '/character' component={CharacterCreate}/>
    <Route path = '/home/:id' component={Detail}/>

    {/* <Route path="/detail/:id" component={Detail} />
    <Route path="/home/character" component={CharacterCreate} /> */}
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
