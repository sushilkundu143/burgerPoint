import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Order from './Components/Order'
import List from './Components/List'

function App() {
  return (
    <Router>
          <div className="container-fluid">
            <Switch>
                <Route exact path='/' component={Order} />
                <Route path='/list' component={List} />
            </Switch>
          </div>
        </Router>
  );
}

export default App; 
 