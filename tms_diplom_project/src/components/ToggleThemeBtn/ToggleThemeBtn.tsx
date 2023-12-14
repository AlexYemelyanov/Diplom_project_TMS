import { useLayoutEffect } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { themeSelector } from '../../redux/selectors';
import { toggleTheme } from '../../redux';

export const ToggleThemeBtn = () => {
	const { theme } = useAppSelector(themeSelector);
	const dispatch = useAppDispatch();

	const toggleThemeMode = () => {
		dispatch(toggleTheme());
	};

	useLayoutEffect(() => {
		const root = window.document.documentElement;
		root.setAttribute('data-theme', theme);
	}, [theme]);

	return (
		<div className={styles['toggle-mode-btn']}>
			<button onClick={toggleThemeMode}>
				{theme === 'light' ? (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='#363535'
						width='30'
						height='30'
						transform='rotate(-45)'
						viewBox='0 0 32 32'
					>
						<path
							fillRule='evenodd'
							strokeWidth='0'
							d='M14.23 30c-4.94-.36-12.18-6.27-12.18-14S9.13 2.43 14.23 2c1.53-.13.72-.13 2.14 0-3.34 2.1-7.15 7.96-7.15 14s2.77 11.62 7.15 14c-1.35.13-.67.1-2.14 0Zm-2.97-14c0-6.9 4.48-12.76 10.74-15-1.76-.64-3.65-1-5.63-1C7.33 0 0 7.16 0 16s7.33 16 16.37 16c1.98 0 3.87-.36 5.63-1a16.01 16.01 0 0 1-10.74-15Z'
						/>
					</svg>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='30'
						height='30'
						fill='none'
						viewBox='0 0 24 24'
					>
						<g stroke='#fff' strokeWidth='1.5'>
							<circle cx='12' cy='12' r='5' />
							<path
								strokeLinecap='round'
								d='M12 2v2M12 20v2M4 12H2M22 12h-2M19.78 4.22l-2.22 2.03M4.22 4.22l2.22 2.03M6.44 17.56l-2.22 2.22M19.78 19.78l-2.22-2.22'
							/>
						</g>
					</svg>
				)}
			</button>
		</div>
	);
};
