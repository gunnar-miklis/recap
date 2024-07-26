import { useAuthContext } from '../context/AuthContext';

export default function IsPublic({ children }) {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) return <>{children}</>;
  return null;
}
