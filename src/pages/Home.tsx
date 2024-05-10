import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase/firebase';

export default function Home() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const isLogoutConfirm = confirm('Are you sure you want to logout?');
    if (isLogoutConfirm) {
      await auth.signOut();
      navigate('/login', { replace: true });
    }
  };
  return (
    <div>
      <button type="button" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}
