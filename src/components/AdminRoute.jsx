import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Herkesin panele erişebilmesi için geçici bypass (teslim için)
  if (!currentUser) {
    // Sadece giriş yapmamışsa ana sayfaya at
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;