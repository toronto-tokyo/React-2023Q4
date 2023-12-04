import { Link } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import classes from './NavLink.module.css';

interface IProps {
  routePath: string;
}

function NavLink({ routePath, children }: PropsWithChildren<IProps>) {
  return (
    <Link className={classes.navLink} to={routePath}>
      {children}
    </Link>
  );
}

export default NavLink;
