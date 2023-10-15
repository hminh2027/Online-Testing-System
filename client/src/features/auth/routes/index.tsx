import { Route, Routes } from 'react-router-dom';

import * as AuthPage from '../pages';

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="signup" element={<AuthPage.SignUp />} />
      <Route path="login" element={<AuthPage.Login />} />
    </Routes>
  );
}
