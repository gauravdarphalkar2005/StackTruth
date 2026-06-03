import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCurrentUser } from '@/lib/auth';

const Index = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, []);

  return null;
};

export default Index;
