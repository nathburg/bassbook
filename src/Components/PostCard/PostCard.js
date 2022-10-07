import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { deletePost } from '../../services/posts';

import './PostCard.css';

export default function PostCard({ title, description, user_id, id }) {
  const { user, submit, setSubmit, isFish } = useContext(UserContext);
  const owner = user.id === user_id;
  return (
    <div className={`${isFish ? 'fish-post' : 'post'}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      {owner && (
        <div className="buttons">
          <button>
            <Link to={`/post/edit/${id}`}>Edit</Link>
          </button>
          <button
            onClick={async () => {
              await deletePost(id);
              setSubmit(!submit);
              // if resp isn't an error, have a submit state that was passed in from Main that rerenders Main
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}


// comment