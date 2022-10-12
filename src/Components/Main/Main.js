import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { usePosts } from '../../hooks/usePosts';
import PostCard from '../PostCard/PostCard';

import './Main.css';

export default function Posts() {
  const { loading, error, posts } = usePosts();
  const { user } = useContext(UserContext);
  if (!user) return <Redirect to='/auth/sign-up' />;
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <div className='posts'>
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
//test comment