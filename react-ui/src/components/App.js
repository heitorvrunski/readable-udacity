import React from 'react';
import Homepage from './Homepage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from './NotFound'
import NewPost from './NewPost';
import PostDetail from './PostDetail';


const App = () => (
  <Router>
    <div className='container'>
      <Switch>
        <Route path='/' exact component={Homepage} />
        <Route path="/new" exact component={NewPost} />
        <Route path="/:category/edit/:id" exact component={NewPost} />
        <Route path="/:category/:id" exact component={PostDetail} />
        <Route path='/:category' exact component={props => <Homepage {...props} />} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </Router>

);


export default App;
