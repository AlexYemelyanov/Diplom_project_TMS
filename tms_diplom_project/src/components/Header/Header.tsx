import { Link, NavLink, useNavigate} from 'react-router-dom';
import styles from './styles.module.scss';
import { Button } from '../Button';
import Logo from '../../assets/Logo.svg'


export const Header = () => {
  const navigate = useNavigate()





  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link to = '/'>
          <img src={Logo} className={styles.logo} alt="Logo" />
        </Link>
        <nav className={styles.header__nav}>
          <ul className = {styles.nav} >
          {user ? (
            <li className={styles.nav_item}>
              <NavLink 
              to = '/about' 
              className={({ isActive }) => 
              `${styles.nav_links} + (${isActive} ? ${styles.activated} : ${''})`
              }
              >
                About
              </NavLink>
            </li>
            
          ) : (
            <>
            <li className={styles.nav_item}>
              <NavLink 
              to = '/about' 
              className={({ isActive }) => 
              `${styles.nav_links} + (${isActive} ? ${styles.activated} : ${''})`
              }
              >
                About
              </NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink 
              to = '/projects' 
              className={({ isActive }) => 
              `${styles.nav_links} + (${isActive} ? ${styles.activated} : ${''})`
              }
              >
                Projects
              </NavLink>
            </li>
            <li className={styles.nav_item}>
              <NavLink 
              to = '/profile' 
              className={({ isActive }) => 
              `${styles.nav_links} + (${isActive} ? ${styles.activated} : ${''})`
              }
              >
                Profile
              </NavLink>
            </li>
            </>
          )}
          </ul>
        </nav>
        <div className={styles.header__controls}>
          {user ? 
          <Button className={styles.header__controls_logout} onClick = {handleLogout}>Log out</Button> : (
            <>
            <Button className={styles.header__controls_login} onClick = {() => navigate('/login')}>Log in</Button>
            <Button className={styles.header__controls_signIn} onClick = {() => navigate('/signIn')}>Sign in</Button>
            </>
          )}
          <ToggleThemeBtn />
        </div>
      </div>
    </header>
  )
}