import styles from './styles.module.scss';

export const Home = () => {
	return (
		<div className='container'>
			<div className={styles.home__container}>
				<h1>Добро пожаловать на мою "поломанную" доску задач</h1>
			</div>
		</div>
	);
};
