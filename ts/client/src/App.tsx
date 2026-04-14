import { useAuth } from "./auth/AuthContext";
import { AuthScreen } from "./screens/AuthScreen";
import { TodoScreen } from "./screens/TodoScreen";

export function App() {
  const { token, user } = useAuth();

  if (!token || !user) {
    return <AuthScreen />;
  }

  return <TodoScreen />;
}
