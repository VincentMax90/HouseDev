import { useSelector } from "react-redux";
import { Navigate , Outlet} from "react-router";

const ProtectedRouteAdmin = ({ children }) => {
  const user = useSelector((state) => state.user);
  
  if (!user || user.admin !== true){
    return <Navigate to="/login" />;
  }
  return <Outlet/>;
};

export default ProtectedRouteAdmin;
