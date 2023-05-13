import { useEffect } from "react";
import RouteProvider from "./routes";
import { authApi } from "./features/auth/api/authApi";
import { useAuth } from "./features/auth/stores/useAuth";
import { socket } from "./lib";

export const App = () => {
  const [isAuthed, setUser, user] = useAuth((state) => [
    state.isAuthed(),
    state.setUser,
    state.user,
  ]);

  const onConnect = () => console.log("Client connected:", socket.id);

  const onDisconnect = () => socket.disconnect();

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", () => {
      setTimeout(
        () => socket.connect(),
        import.meta.env.VITE_HEARTBEAT_INTERVAL
      );
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [user]);

  useEffect(() => {
    if (!isAuthed) return;
    (async () => {
      const { user } = await authApi.getMe();
      setUser(user);
    })();
  }, [isAuthed]);

  return <RouteProvider />;
};
