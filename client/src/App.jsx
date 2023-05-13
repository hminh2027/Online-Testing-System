import { useEffect } from "react";
import RouteProvider from "./routes";
import { authApi } from "./features/auth/api/authApi";
import { useAuth } from "./features/auth/stores/useAuth";

export const App = () => {
  const [isAuthed, setUser] = useAuth((state) => [
    state.isAuthed(),
    state.setUser,
  ]);

  useEffect(() => {
    if (!isAuthed) return;
    (async () => {
      const { user } = await authApi.getMe();
      setUser(user);
    })();
  }, [isAuthed]);

  return <RouteProvider />;
};
