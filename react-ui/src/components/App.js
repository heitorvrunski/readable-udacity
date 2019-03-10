import React, { Component } from 'react';
import Homepage from './Homepage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './NotFound'
import NewPost from './NewPost';

class App extends Component {
  render() {
    return (


      <Router>
        <div className="container">
          <Switch>
            <Route path='/' exact component={Homepage} />
            <Route path="/new" exact component={NewPost} />
            <Route path='/:category' exact component={props => <Homepage {...props} />} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
