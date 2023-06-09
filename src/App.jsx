import AppRoutes from './Routes/appRoutes';
import NavBar from './components/navbar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserMessage from './components/Message/MessageComponent';

function App() {
  return (
    <div className="App">
      <NavBar />
      <AppRoutes />
      <UserMessage />
    </div>
  );
}

export default App;
