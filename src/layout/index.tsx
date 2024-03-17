import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import styles from './Layout.module.css';

import type { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Topbar />
      <Sidebar />
      <main className={styles.mainSection}>{children}</main>
    </>
  );
};

export default Layout;
