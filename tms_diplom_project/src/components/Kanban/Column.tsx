/* eslint-disable @typescript-eslint/no-explicit-any */
import { shuffle } from 'lodash';
import { useEffect, useState } from 'react';
import boardsSlice from '../../redux/board/boardsSlice';
import Task from './Task';
import { Board } from '../../types/BoardTypes';
import { ColumnKanban } from '../../types/ColumnKanbanType';

import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { TaskKanban } from '../../types/TaskTypeKanban';

interface Column {
	colIndex: number | string;
}

function Column({ colIndex }: Column) {
	const colors: string[] = [
		'bg-red-500',
		'bg-orange-500',
		'bg-blue-500',
		'bg-purple-500',
		'bg-green-500',
		'bg-indigo-500',
		'bg-yellow-500',
		'bg-pink-500',
		'bg-sky-500',
	];

	const dispatch = useAppDispatch();
	const [color, setColor] = useState(null);
	const boards = useAppSelector((state) => state.boards);
	const board = boards.find((board: Board) => board.isActive === true);
	const col = board?.columns.find(
		(_col: ColumnKanban, i: number) => i === colIndex
	);
	useEffect(() => setColor(shuffle(colors).pop()), [dispatch]);

	const handleOnDrop = (e: any) => {
		const { prevColIndex, taskIndex } = JSON.parse(
			e.dataTransfer.getData('text')
		);

		if (colIndex !== prevColIndex) {
			dispatch(
				boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
			);
		}
	};

	const handleOnDragOver = (e: { preventDefault: () => void }) => {
		e.preventDefault();
	};

	return (
		<div
			onDrop={handleOnDrop}
			onDragOver={handleOnDragOver}
			className='scrollbar-hide   mx-5 pt-[90px] min-w-[280px] '
		>
			<p className=' font-semibold flex  items-center  gap-2 tracking-widest md:tracking-[.2em] text-[#828fa3]'>
				<div className={`rounded-full w-4 h-4 ${color} `} />
				{col?.name} ({col?.tasks.length})
			</p>

			{col?.tasks.map((_task: TaskKanban, index: number) => (
				<Task key={index} taskIndex={index} colIndex={colIndex} />
			))}
		</div>
	);
}

export default Column;
