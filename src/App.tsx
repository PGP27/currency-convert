import { AppProvider } from './context/AppContext';
import Home from './pages/Home';

import './index.css';

const App = () => {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
};

export default App;
