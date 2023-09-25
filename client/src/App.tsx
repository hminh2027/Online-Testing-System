import AppProvider from './providers';
import 'antd/dist/reset.css';
import '@/App.css';
import { AppRoutes } from './routes';

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
