import { Route, Routes } from 'react-router-dom';
import Login from '../pages/LogIn';
import SignUp from '../pages/SignUp';

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}
