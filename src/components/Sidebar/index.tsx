import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import styles from './Sidebar.module.css';
import useLayoutHooks from './hooks';

const menus = [
  { label: 'Products', url: '/' },
  { label: 'Carts', url: '/carts' }
];

const Sidebar = () => {
  const { data: { pathname } } = useLayoutHooks();
  return (
    <div className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <Image src={Logo} alt='' width={120} height={45} />
      </div>
      <div className={styles.menuContainer}>
        {menus.map((menu) => {
          const isActive = menu.url === pathname;
          return (
            <Link
              key={`menu-${menu.label}`}
              href={menu.url}
              className={isActive ? styles.menuActive : styles.menu}
            >
              {menu.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
