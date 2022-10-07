import { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './ChooseTheme.css';

export default function ChooseTheme() {
  const { setIsFish, user } = useContext(UserContext);
  const history = useHistory();

  if (!user) {
    return <Redirect to='/auth/sign-in' />;
  }
  
  return (
    <div className='choose-theme'>
      <div className='topic-button' onClick={() => {
        setIsFish(true);
        history.push('/');
      }}>🐟</div>
      <div className='topic-button' onClick={() => {
        setIsFish(false);
        history.push('/');
      }}>🎸</div>
    </div>
  );
}
