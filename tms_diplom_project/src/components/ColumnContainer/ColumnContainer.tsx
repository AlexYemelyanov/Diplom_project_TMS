import { SortableContext, useSortable } from '@dnd-kit/sortable';
import Trashicon from '../../icons/Trashicon';
import { Column, Id } from '../../types/ColumnType';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from 'react';
import PlusIcon from '../../icons/PlusIcon';
import { Task } from '../../types/TaskType';
import { TaskCard } from '../TaskCard/TaskCard';

interface ColumnProps {
	column: Column;
	deleteColumn: (id: Id) => void;
	updateColumn: (id: Id, title: string) => void;
	createTask: (columnId: Id) => void;
	tasks: Task[];
	deleteTask: (id: Id) => void;
	updateTask: (id: Id, content: string) => void;
	createModal: (taskId: Id) => void;
}

function ColumnContainer(props: ColumnProps) {
	const {
		column,
		deleteColumn,
		updateColumn,
		createTask,
		tasks,
		deleteTask,
		updateTask,
		createModal,
	} = props;

	const [editMode, setEditMode] = useState(false);

	const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: column.id,
		data: {
			type: 'Column',
			column,
		},
		disabled: editMode,
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	if (isDragging) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				className='
      flex
      flex-col
      bg-[var(--column-bg)]
      opacity-40
      border-2
      border-rose-500
      w-[350px]
      h-[500px]
      max-h-[500px]

    '
			></div>
		);
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className='
      flex
      flex-col
      bg-[var(--column-bg)]
      w-[350px]
      h-[500px]
      max-h-[500px]

    '
		>
			{/* Column Title*/}
			<div
				{...attributes}
				{...listeners}
				onClick={() => {
					setEditMode(true);
				}}
				className='
        flex
        justify-between
        items-center
        bg-[var(--column-bg-title)]
        text-md
        h-[60px]
        cursor-grab
        rounded-md
        rounded-b-none
        p-3
        font-bold
        border-[var(--column-bg-title)]
        border-4
      '
			>
				<div className='flex gap-2'>
					<div
						className='
            flex
            justify-center
            item-center
            bg-[var(--column-bg-title)]
            px-2
            py-1
            text-sm
            rounded-full
          '
					>
						0
					</div>

					{!editMode && column.title}
					{editMode && (
						<input
							className='
              bg-[var(--placeholder-color)] 
              focus:border-rose-500
              border-rounded
              outline-none
              px-2
              text-[var(--column-title-font-color)]
              '
							value={column.title}
							onChange={(e) => updateColumn(column.id, e.target.value)}
							autoFocus
							onBlur={() => {
								setEditMode(false);
							}}
							onKeyDown={(e) => {
								if (e.key !== 'Enter') return;
								setEditMode(false);
							}}
						/>
					)}
				</div>
				<button
					onClick={() => {
						deleteColumn(column.id);
					}}
					className='
          stroke-[var(--font-color)]
          hover:stroke-white
          hover:bg-[var(--column-bg-title)]
          hover:border-none
          rounded
          border-none
          px-1
          py-2
        '
				>
					<Trashicon />
				</button>
			</div>

			{/* Column task Container*/}
			<div
				className='flex 
			flex-grow
			flex-col
			gap-4
			p-2
			overflow-x-hidden
			overflow-y-auto
			'
			>
				<SortableContext items={tasksIds}>
					{tasks.map((task) => (
						<TaskCard
							key={task.id}
							task={task}
							deleteTask={deleteTask}
							updateTask={updateTask}
							createModal={createModal}
						/>
					))}
				</SortableContext>
			</div>
			{/* Column Footer*/}
			<button
				className='
			flex 
			gap-2 
			items-center 
			border-[var(--border)]
			border-2
			rounded-md
			p-4
			border-x-[var(--border)]
			
			'
				onClick={() => {
					createTask(column.id);
				}}
			>
				<PlusIcon />
				Add task
			</button>
		</div>
	);
}

export default ColumnContainer;
