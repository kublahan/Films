import { Header } from '../../components/Header'; // Correct the path to Header
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
    </>
  );
}