import { useState } from 'react'
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import PreView from "./pages/preview/index";
import View from "./pages/view";
import './app.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Switch>
        <Route path="/preview" component={PreView} />
        <Route path="/view" component={View} />
      </Switch>
    </Router>
  )
}

export default App
