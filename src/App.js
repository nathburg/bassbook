import './App.css';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import NewPost from './Components/NewPost/NewPost';
import EditPost from './Components/EditPost/EditPost';
import ChooseTheme from './Components/ChooseTheme/ChooseTheme';
import Footer from './Components/Footer/Footer';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {
  const { isFish } = useContext(UserContext);
  return (
    <div className={`App ${isFish ? 'fish-app' : 'music-app'}`}>
      <Header />
      <Switch>
        <Route path="/post/edit/:id" component={EditPost} />
        <Route path="/auth/:type" component={Auth} />
        <Route path="/post/new" component={NewPost} />
        <Route path="/topic" component={ChooseTheme} />
        <Route path="/" component={Main} />
        <Route path="*">
          <Redirect to="/auth/sign-in" />
        </Route>
      </Switch>
      <Footer className={'footer'} />
    </div>
  );
}

export default App;
