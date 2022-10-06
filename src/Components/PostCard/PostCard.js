import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { checkError } from '../../services/client';
import { deletePost } from '../../services/posts';

import './PostCard.css';

export default function PostCard({ title, description, user_id, id }) {
  const { user } = useContext(UserContext);
  const owner = user.id === user_id;
  return (
    <div className="post">
      <h3>{title}</h3>
      <p>{description}</p>
      {owner && (
        <p>
          <Link to={`/posts/edit/${id}`}>Edit </Link>
          <button onClick={async () => {
            const resp = await deletePost(id);
            
            
            // if resp isn't an error, have a submit state that was passed in from Main that rerenders Main
          }}>

          </button>
        </p>
      )}
    </div>
  );
}


// comment