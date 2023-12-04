import classes from './Header.module.css';

interface IProps {
  children: React.ReactNode;
}

function Header({ children }: IProps) {
  return <header className={classes.header}>{children}</header>;
}

export default Header;
