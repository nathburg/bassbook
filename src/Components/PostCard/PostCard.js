import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { checkError } from '../../services/client';
import { deletePost } from '../../services/posts';

import './PostCard.css';

export default function PostCard({ title, description, user_id, id }) {
  const { user, submit, setSubmit } = useContext(UserContext);
  const owner = user.id === user_id;
  return (
    <div className="post">
      <h3>{title}</h3>
      <p>{description}</p>
      {owner && (
        <p>
          <Link to={`/posts/edit/${id}`}>Edit </Link>
          <button onClick={async () => {
            await deletePost(id);
            setSubmit(!submit);
            // if resp isn't an error, have a submit state that was passed in from Main that rerenders Main
          }}>
          Delete
          </button>
        </p>
      )}
    </div>
  );
}


// comment