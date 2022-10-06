import { useEffect, useState } from 'react';
import { getPostDetail } from '../services/posts';

export function usePost(id) {
  const [postDetail, setPostDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostDetail(id);
        setPostDetail(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);
  
  return { postDetail, setPostDetail, loading, error, setError };
}
