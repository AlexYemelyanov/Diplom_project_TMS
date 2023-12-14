import { Home } from './pages/Home/Home';
import { Boards } from './pages/Boards/Boards';
import { Login } from './pages/Login/Login';
import { MainLayout } from './pages/MainLayout/MainLayout';
import './styles/main.scss';
import { Routes, Route } from 'react-router-dom';
import { Todo } from './pages/ToDO/Todo';

function App() {
	return (
		<div className='App'>
			{/* <KanbanBoard /> */}
			<Routes>
				<Route element={<MainLayout />}>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/boards' element={<Boards />} />
					<Route path='/todo' element={<Todo />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
