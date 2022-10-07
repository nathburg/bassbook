import { useHistory, useParams } from 'react-router-dom';
import { updatePost } from '../../services/posts';
import { usePost } from '../../hooks/usePost';

import './EditPost.css';

export default function EditPost() {
  const { id } = useParams();
  const { postDetail, setPostDetail, loading, error, setError } = usePost(id);
  const history = useHistory();

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
    <div className='input-form music'>
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
      <label>Topic</label>
      <select>
        <option>Fish</option>
        <option>Music</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

  


  



