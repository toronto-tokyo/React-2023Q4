import { ReactNode } from 'react';
import classes from './NavBar.module.css';

interface IProps {
  children: ReactNode;
}

function NavBar({ children }: IProps) {
  return <nav className={classes.navBar}>{children}</nav>;
}

export default NavBar;
