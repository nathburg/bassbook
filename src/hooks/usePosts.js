import { useEffect, useState } from 'react';
import { getPosts } from '../services/posts';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // fetch all the posts from supabase
      try {
        const data = await getPosts();
        setPosts(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { posts, error, loading };
}