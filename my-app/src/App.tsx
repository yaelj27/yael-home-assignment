import { HomeScreen } from './Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import { Item } from './Item/Item';

function App() {

  return (
    <div className="app">
      <Router>
        <Switch>

          <Route exact path="/" component={HomeScreen} />
          <Route path="/:id" component={(match: any) => Item(match.location.pathname.substring(1))} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
