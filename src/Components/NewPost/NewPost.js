import { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { createPost } from '../../services/posts';
import './NewPost.css';

export default function NewPost(title, description) {
  const [titleInput, setTitleInput] = useState(title);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const { isFish, user } = useContext(UserContext);
  const history = useHistory();
  if (!user) return <Redirect to='/auth/sign-up' />;
  
  const handleSubmit = async (title, description) => {
    try {
      await createPost(title, description);
      history.push('/');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  };

  return (
    <div className='create-post-container'>
      <div className={`input-form ${isFish ? 'fish' : 'music'}`}>
        <label className="music-text">Title</label>
        <input type="text" onChange={(e) => setTitleInput(e.target.value)} />
        <label className="music-text">Description</label>
        <input type="text" onChange={(e) => setDescriptionInput(e.target.value)} />
        <button
          onClick={() => {
            handleSubmit(titleInput, descriptionInput);
          }}
        >
        Submit
        </button>
      </div>
    </div>
  );
}
