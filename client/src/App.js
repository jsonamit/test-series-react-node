import './App.css';
import './theme/main.css';
import AppRouting  from './routing/AppRouting';
import { Toast } from './helpers/NotifyHelper';

function App() {
  return (
    <>
        <Toast />
        <AppRouting />
    </>
  );
}

export default App;
