import { useState } from 'react';
import Trashicon from '../../icons/Trashicon';
import { Task } from '../../types/TaskType';
import { Id } from '../../types/ColumnType';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskProps {
	task: Task;
	deleteTask: (id: Id) => void;
	updateTask: (id: Id, content: string) => void;
}

export const TaskCard = ({ task, deleteTask, updateTask }: TaskProps) => {
	const [mouseIsOver, setMouseIsOver] = useState(false);
	const [editMode, setEditMode] = useState(false);

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task.id,
		data: {
			type: 'Task',
			task,
		},
		disabled: editMode,
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	const toggleEditMode = () => {
		setEditMode((prev) => !prev);
		setMouseIsOver(false);
	};

	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className='
				bg-[var(--task-dragging)]
    		p-2.5
    		h-[100px]
    		min-h-[100px]
    		items-center
    		flex
    		text-left
    		rounded-xl
    		border-2
				border-rose-500
    		cursor-grab
    		relative
				opacity-30
		'
			/>
		);
	}

	if (editMode) {
		return (
			<>
				<div
					ref={setNodeRef}
					style={style}
					{...attributes}
					{...listeners}
					onClick={toggleEditMode}
					className='
    bg-[var(--column-bg)]
    p-2.5
    h-[100px]
    min-h-[100px]
    items-center
    flex
    text-left
    rounded-xl
    hover:ring-2
    hover:ring-rose-500
    cursor-grab
    relative
  '
				>
					<textarea
						className='
						h-[90%]
						w-full
						resize-none
						border-none
						rounded
						bg-transparent
						text-[var(--font-color)]
						focus:outline-none
					'
						value={task.content}
						autoFocus
						placeholder='Edit'
						onBlur={toggleEditMode}
						onKeyDown={(e) => {
							if (e.key === 'Enter') toggleEditMode;
						}}
						onChange={(e) => updateTask(task.id, e.target.value)}
					></textarea>
				</div>
			</>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			onClick={toggleEditMode}
			className='
    bg-[var(--column-bg)]
    p-2.5
    h-[100px]
    min-h-[100px]
    items-center
    flex
    text-left
    rounded-xl
    hover:ring-2
    hover:ring-rose-500
    cursor-grab
    relative
    
  '
			onMouseEnter={() => {
				setMouseIsOver(true);
			}}
			onMouseLeave={() => {
				setMouseIsOver(false);
			}}
		>
			{task.content}
			{mouseIsOver && (
				<button
					onClick={() => {
						deleteTask(task.id);
					}}
					className='
        stroke-[var(--font-color)]
        absolute
        right-4
        top-1/2-translate-y-1/2
        bg-[var(--column-bg)]
        p-2
        rounded
        opacity-60
        hover:opacity-100
      '
				>
					<Trashicon />
				</button>
			)}
		</div>
	);
};
