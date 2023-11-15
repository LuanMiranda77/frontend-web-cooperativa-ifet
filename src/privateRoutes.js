import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './service/auth';



const PrivateRoute = ({ component: Component, ...rest }) => (
  // <Route {...rest} render={props =>
   
      isAuthenticated() ? <Component {...rest}/> : <Navigate replace to="/login" />
     // <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
      
    // }/>
);

export default PrivateRoute;