import { Redirect, useHistory, useParams } from 'react-router-dom';
import { updatePost } from '../../services/posts';
import { usePost } from '../../hooks/usePost';

import './EditPost.css';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

export default function EditPost() {
  const { id } = useParams();
  const { postDetail, setPostDetail, loading, error, setError } = usePost(id);
  const { isFish, user } = useContext(UserContext);
  const history = useHistory();

  if (!user) return <Redirect to='/auth/sign-up' />;

  const handleSubmit = async () => {
    try {
      await updatePost(id, postDetail.title, postDetail.description);
      history.push('/posts');
    } catch (error) {
      setError(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className='edit-post-container'>
      <div className={`input-form ${isFish ? 'fish' : 'music'}`}>
        <label>Title</label>
        <input
          type="text"
          value={postDetail.title}
          onChange={(e) => setPostDetail({ ...postDetail, title: e.target.value })}
        />
        <label>Description</label>
        <input
          type="text"
          value={postDetail.description}
          onChange={(e) => setPostDetail({ ...postDetail, description: e.target.value })}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

  


  



