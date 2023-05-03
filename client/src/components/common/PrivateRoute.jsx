import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/stores/useAuth";

export const PrivateRoute = ({ Component }) => {
  const isAuthed = useAuth((state) => state.isAuthed());
  return <>{isAuthed ? Component : <Navigate to="/auth/login" replace />}</>;
};
