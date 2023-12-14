import { useState } from 'react';
import boardsSlice from '../../redux/board/boardsSlice';
import Header from '../../components/Kanban/Header';
import Home from '../../components/Kanban/Home';
import EmptyBoard from '../../components/Kanban/EmptyBoard';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { Board } from '../../types/BoardTypes';

export const Boards = () => {
	const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
	const dispatch = useAppDispatch();
	const boards = useAppSelector((state) => state.boards);
	const activeBoard = boards.find((board: Board) => board.isActive);
	if (!activeBoard && boards.length > 0)
		dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
	return (
		<div className=' overflow-hidden  overflow-x-scroll'>
			<>
				{boards.length > 0 ? (
					<>
						<Header
							setIsBoardModalOpen={setIsBoardModalOpen}
							isBoardModalOpen={isBoardModalOpen}
						/>
						<Home
							setIsBoardModalOpen={setIsBoardModalOpen}
							isBoardModalOpen={isBoardModalOpen}
						/>
					</>
				) : (
					<>
						<EmptyBoard type='add' />
					</>
				)}
			</>
		</div>
	);
};
