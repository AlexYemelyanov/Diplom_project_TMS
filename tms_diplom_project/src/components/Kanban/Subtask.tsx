/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import boardsSlice from '../../redux/board/boardsSlice';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { Board } from '../../types/BoardTypes';

interface Subtask {
	index: number | string;
	taskIndex: number | string;
	colIndex: number | string;
}

function Subtask({ index, taskIndex, colIndex }: Subtask) {
	const dispatch = useAppDispatch();
	const boards = useAppSelector((state) => state.boards);
	const board = boards.find((board: Board) => board.isActive === true);
	const col = board?.columns.find((_col, i) => i === colIndex);
	const task = col?.tasks.find((_task, i) => i === taskIndex);
	const subtask = task?.subtasks.find((_subtask, i) => i === index);
	const checked = subtask?.isCompleted;

	const onChange = (_e: any) => {
		dispatch(
			boardsSlice.actions.setSubtaskCompleted({ index, taskIndex, colIndex })
		);
	};

	return (
		<div className=' w-full flex hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md relative items-center justify-start dark:bg-[#20212c]  p-3 gap-4  bg-[#f4f7fd]'>
			<input
				className=' w-4 h-4  accent-[#635fc7] cursor-pointer '
				type='checkbox'
				checked={checked}
				onChange={onChange}
			/>
			<p className={checked && ' line-through opacity-30 '}>{subtask?.title}</p>
		</div>
	);
}

export default Subtask;
