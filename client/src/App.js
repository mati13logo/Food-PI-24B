import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import Home from './components/Home/Home.jsx';
import CreateRecipe from './components/Form/CreateRecipe.jsx';
import Details from './components/Details/Details.jsx'
import Error404 from './components/Error404/Error404.jsx';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/recipe' component={CreateRecipe} />
        <Route exact path='/home/:id' component={Details} />
        <Route path="*" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
