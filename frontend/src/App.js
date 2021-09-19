import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollIntoTop from './hooks/ScrollIntoTop';
import Index from "./components/main/Index";
import NotFound from './components/main/NotFound';


function App() {
  return (
    <div className="App">
      <Router>
        <ScrollIntoTop>
          <Switch>
            <Route exact path='/' component={Index} />
            <Route component={NotFound} />
          </Switch>
        </ScrollIntoTop>
      </Router>
    </div>
  );
}

export default App;
