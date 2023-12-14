/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Logo from '../../assets/logo-mobile.svg';
import iconDown from '../../assets/icon-chevron-down.svg';
import iconUp from '../../assets/icon-chevron-up.svg';
import ellipsis from '../../assets/icon-vertical-ellipsis.svg';
import HeaderDropDown from './HeaderDropDown';
import EllipsisMenu from './EllipsisMenu';
import AddEditTaskModal from '../Modals/AddEditTaskModal';
import AddEditBoardModal from '../Modals/AddEditBoardModal';
import DeleteModal from '../Modals/DeleteModal';
import boardsSlice from '../../redux/board/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { Board } from '../../types/BoardTypes';

interface Header {
	setIsBoardModalOpen: any;
	isBoardModalOpen: boolean;
}

function Header({ setIsBoardModalOpen, isBoardModalOpen }: Header) {
	const [openDropdown, setOpenDropdown] = useState(false);
	const [isEllipsisMenuOpen, setIsEllipsisMenuOpen] = useState(false);
	const [boardType, setBoardType] = useState<string>('add');
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

	const dispatch = useAppDispatch();

	const boards = useAppSelector((state) => state.boards);
	const board = boards.find((board: Board) => board.isActive);

	const onDropdownClick = () => {
		setOpenDropdown((state) => !state);
		setIsEllipsisMenuOpen(false);
		setBoardType('add');
	};

	const setOpenEditModal = () => {
		setIsBoardModalOpen(true);
		setIsEllipsisMenuOpen(false);
	};
	const setOpenDeleteModal = () => {
		setIsDeleteModalOpen(true);
		setIsEllipsisMenuOpen(false);
	};

	const onDeleteBtnClick = (e: any) => {
		if (e.target.textContent === 'Delete') {
			dispatch(boardsSlice.actions.deleteBoard());
			dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
			setIsDeleteModalOpen(false);
		} else {
			setIsDeleteModalOpen(false);
		}
	};

	return (
		<div
			className=' p-8 
		fixed 
		left-0 
		bg-[var(--column-bg)]
		z-1 
		right-0 
		-mt-10'
		>
			<header className=' flex justify-between text-[var(--font-color)] items-center '>
				{/* Left Side  */}
				<div className=' flex items-center space-x-2  md:space-x-4'>
					<div className=' flex items-center '>
						<h3 className=' truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  '>
							{board?.name}
						</h3>
						<img
							src={openDropdown ? iconUp : iconDown}
							alt=' dropdown icon'
							className=' w-3 ml-2 md:hidden'
							onClick={onDropdownClick}
						/>
					</div>
				</div>

				{/* Right Side */}

				<div className=' flex space-x-4 items-center md:space-x-6 '>
					<button
						className=' button hidden md:block '
						onClick={() => {
							setIsTaskModalOpen((prevState) => !prevState);
						}}
					>
						+ Add New Task
					</button>
					<button
						onClick={() => {
							setIsTaskModalOpen((prevState) => !prevState);
						}}
						className=' button py-1 px-3 md:hidden '
					>
						+
					</button>

					<img
						onClick={() => {
							setBoardType('edit');
							setOpenDropdown(false);
							setIsEllipsisMenuOpen((prevState) => !prevState);
						}}
						src={ellipsis}
						alt='ellipsis'
						className=' cursor-pointer h-6'
					/>
					{isEllipsisMenuOpen && (
						<EllipsisMenu
							type='Boards'
							setOpenEditModal={setOpenEditModal}
							setOpenDeleteModal={setOpenDeleteModal}
						/>
					)}
				</div>

				{openDropdown && (
					<HeaderDropDown
						setOpenDropdown={setOpenDropdown}
						setIsBoardModalOpen={setIsBoardModalOpen}
					/>
				)}
			</header>
			{isTaskModalOpen && (
				<AddEditTaskModal
					setIsAddTaskModalOpen={setIsTaskModalOpen}
					type='add'
					device='mobile'
					setIsTaskModalOpen={undefined}
					taskIndex={''}
					prevColIndex={0}
				/>
			)}

			{isBoardModalOpen && (
				<AddEditBoardModal
					setBoardType={setBoardType}
					type={boardType}
					setIsBoardModalOpen={setIsBoardModalOpen}
				/>
			)}
			{isDeleteModalOpen && (
				<DeleteModal
					setIsDeleteModalOpen={setIsDeleteModalOpen}
					type='board'
					title={board?.name}
					onDeleteBtnClick={onDeleteBtnClick}
				/>
			)}
		</div>
	);
}

export default Header;
