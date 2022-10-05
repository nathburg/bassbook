import { usePosts } from '../../hooks/usePosts';
import PostCard from '../PostCard/PostCard';

import './Main.css';

export default function Posts() {
  const { loading, error, posts } = usePosts();
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
