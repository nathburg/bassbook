import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { createPost } from '../../services/posts';

export default function NewPost(title, description) {
  const [titleInput, setTitleInput] = useState(title);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const { isFish } = useContext(UserContext);
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
    <div className={`input-form ${isFish ? 'fish' : 'music'}`}>
      <label className="music-text">Title
        <input type="text" onChange={(e) => setTitleInput(e.target.value)} />
      </label>
      <label className="music-text">Description
        <input type="text" onChange={(e) => setDescriptionInput(e.target.value)} />
      </label>
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
