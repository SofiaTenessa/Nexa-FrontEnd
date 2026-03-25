import './styles/index.css';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import styles from './components/Navbar/Navbar.module.css';

export default function App() {
  return (
    <div className={styles['app-shell']}>
      <Sidebar />
      <Home />
    </div>
  );
}