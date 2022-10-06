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
      console.error(e.message);
    }
  };

  return (
    <div>
      <label>Title</label>
      <input type="text" onChange={(e) => setTitleInput(e.target.value)} />
      <label>Description</label>
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
