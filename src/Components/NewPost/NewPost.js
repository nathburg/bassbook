import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createPost } from '../../services/posts';

export default function NewPost(title, description) {
  const [titleInput, setTitleInput] = useState(title);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const history = useHistory();

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
    <div className="input-form music">
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
  );
}
