import styles from './Topbar.module.css';
import useTopbarHooks from './hooks';

const Topbar = () => {
  const { methods: { logout } } = useTopbarHooks();
  return (
    <div className={styles.topbar}>
      <button
        className={styles.buttonLogout}
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
