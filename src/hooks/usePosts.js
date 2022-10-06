import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { getPosts } from '../services/posts';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { submit } = useContext(UserContext);

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
  }, [submit]);

  return { posts, error, loading };
}