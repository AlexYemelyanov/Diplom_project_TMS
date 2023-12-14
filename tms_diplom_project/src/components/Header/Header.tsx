import { Link, NavLink, useNavigate } from 'react-router-dom';
import { authSelector } from '../../redux';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { ToggleThemeBtn } from '../ToggleThemeBtn';
import { Button } from '../Button';
import Logo from '../../assets/Logo.svg';
import { signOut } from '../../redux';

export const Header = () => {
	const navigate = useNavigate();
	const { user } = useAppSelector(authSelector);
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		if (window.confirm('Are you sure you want to sign out?')) {
			dispatch(signOut());
			navigate('/');
		}
	};

	return (
		<header className={styles.header}>
			<div className={styles.header__container}>
				<Link to='/'>
					<img src={Logo} className={styles.logo} alt='Logo' />
				</Link>
				<nav className={styles.header__nav}>
					<ul className={styles.nav}>
						{!user ? (
							<li className={styles.nav_item}>
								<NavLink
									to='/about'
									className={({ isActive }) =>
										`${styles.nav_links} + (${isActive} ? ${
											styles.activated
										} : ${''})`
									}
								>
									About
								</NavLink>
							</li>
						) : (
							<>
								<li className={styles.nav_item}>
									<NavLink
										to='/about'
										className={({ isActive }) =>
											`${styles.nav_links} + (${isActive} ? ${
												styles.activated
											} : ${''})`
										}
									>
										About
									</NavLink>
								</li>
								<li className={styles.nav_item}>
									<NavLink
										to='/todo'
										className={({ isActive }) =>
											`${styles.nav_links} + (${isActive} ? ${
												styles.activated
											} : ${''})`
										}
									>
										Todo
									</NavLink>
								</li>
								<li className={styles.nav_item}>
									<NavLink
										to='/boards'
										className={({ isActive }) =>
											`${styles.nav_links} + (${isActive} ? ${
												styles.activated
											} : ${''})`
										}
									>
										Boards
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</nav>
				<div className={styles.header__controls}>
					{user ? (
						<Button
							className={styles.header__controls_logout}
							onClick={handleLogout}
						>
							Log out
						</Button>
					) : (
						<>
							<Button
								className={styles.header__controls_login}
								onClick={() => navigate('/login')}
							>
								Log in
							</Button>
							<Button
								className={styles.header__controls_signIn}
								onClick={() => navigate('/signIn')}
							>
								Sign in
							</Button>
						</>
					)}
					<ToggleThemeBtn />
				</div>
			</div>
		</header>
	);
};
