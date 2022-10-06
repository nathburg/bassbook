import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import NewPost from './Components/NewPost/NewPost';
import EditPost from './Components/EditPost/EditPost';

function App() {
  return (
    <div className="App">
      <Header />
      
      <Switch>
        <Route path='/post/edit/:id' component={EditPost} />
        <Route path="/auth/:type" component={Auth} />
        <Route path='/post/new' component={NewPost} />
        <Route path='/' component={Main} />
        <Route path='*'>
          <Redirect to='/auth/sign-in' />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
