import { useMemo, useState } from 'react';
import { Column, Id } from '../../types/ColumnType';
import ColumnContainer from '../ColumnContainer/ColumnContainer';
import PlusIcon from '../../icons/PlusIcon';
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { Task } from '../../types/TaskType';
import { TaskCard } from '../TaskCard/TaskCard';

export default function KanbanBoard() {
	const [columns, setColumns] = useState<Column[]>([]);
	const columnId = useMemo(() => columns.map((column) => column.id), [columns]);
	const [activeColumn, setActiveColumn] = useState<Column | null>(null);
	const [activeTask, setActiveTask] = useState<Task | null>(null);
	const [tasks, setTasks] = useState<Task[]>([]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 3,
			},
		})
	);

	function generateId() {
		const idNum = Math.random() * 10001;

		return Math.floor(idNum);
	}

	function createNewColumn() {
		const columnToAdd: Column = {
			id: generateId(),
			title: `Column ${columns.length + 1}`,
		};

		setColumns([...columns, columnToAdd]);
	}

	function deleteColumn(id: Id) {
		const filteredColumn = columns.filter((column) => column.id !== id);

		setColumns(filteredColumn);

		const newTasks = tasks.filter((t) => t.columnId !== id);
		setTasks(newTasks);
	}

	function onDragStart(event: DragStartEvent) {
		if (event.active.data.current?.type === 'Column') {
			setActiveColumn(event.active.data.current.column);
			return;
		}

		if (event.active.data.current?.type === 'Task') {
			setActiveTask(event.active.data.current.task);
			return;
		}
	}

	function onDragEnd(event: DragEndEvent) {
		setActiveColumn(null);
		setActiveTask(null);

		const { active, over } = event;

		if (!over) return;

		const activeColumnId = active.id;
		const overColumnId = over.id;

		if (activeColumnId === overColumnId) return;

		setColumns((columns) => {
			const activeColumnIndex = columns.findIndex(
				(column) => column.id === activeColumnId
			);

			const overColumnIndex = columns.findIndex(
				(column) => column.id === overColumnId
			);

			return arrayMove(columns, activeColumnIndex, overColumnIndex);
		});
	}

	function updateColumn(id: Id, title: string) {
		const newColumns = columns.map((column) => {
			if (column.id !== id) return column;
			return { ...column, title };
		});

		setColumns(newColumns);
	}

	function createTask(columnId: Id) {
		const newTask: Task = {
			id: generateId(),
			columnId,
			content: `Task ${tasks.length + 1}`,
		};

		setTasks([...tasks, newTask]);
	}

	const deleteTask = (id: Id) => {
		const newTasks = tasks.filter((task) => task.id !== id);

		setTasks(newTasks);
	};

	const updateTask = (id: Id, content: string) => {
		const newTasks = tasks.map((task) => {
			if (task.id !== id) return task;
			return { ...task, content };
		});

		setTasks(newTasks);
	};

	const createModal = (taskId: Id) => {
		const newModal: Modal = {
			id: generateId,
			taskId,
			title: `Modal ${modals.length + 1}`,
			description: '',
			team: [],
		};
	};

	const onDragOver = (event: DragOverEvent) => {
		const { active, over } = event;

		if (!over) return;

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		const isActiveATask = active.data.current?.type === 'Task';
		const isOverATask = over.data.current?.type === 'Task';

		if (!isActiveATask) return;

		if (isActiveATask && isOverATask) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId);
				const overIndex = tasks.findIndex((t) => t.id === overId);

				tasks[activeIndex].columnId = tasks[overIndex].columnId;

				return arrayMove(tasks, activeIndex, overIndex);
			});
		}

		const isOverAColumn = over.data.current?.type === 'Column';

		if (isActiveATask && isOverAColumn) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((t) => t.id === activeId);

				tasks[activeIndex].columnId = overId;

				return arrayMove(tasks, activeIndex, activeIndex);
			});
		}
	};

	return (
		<div
			className='
      m-auto
      flex
      min-h-screen
      w-full
      items-center
      justify-center
      overflow-x-auto
      overflow-y-hidden
      pa-[40px]
    '
		>
			<DndContext
				sensors={sensors}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				onDragOver={onDragOver}
			>
				<div
					className='
      m-auto
      flex 
      gap-4
      '
				>
					<div
						className='
        flex
        gap-4
        '
					>
						<SortableContext items={columnId}>
							{columns.map((column) => (
								<ColumnContainer
									key={column.id}
									column={column}
									deleteColumn={deleteColumn}
									updateColumn={updateColumn}
									createTask={createTask}
									tasks={tasks.filter((task) => task.columnId === column.id)}
									deleteTask={deleteTask}
									updateTask={updateTask}
									createModal={createModal}
								/>
							))}
						</SortableContext>
					</div>
					<button
						onClick={() => createNewColumn()}
						className='
      h-[60px];
      max-h-[90px]
      w-[750px];
      min-w-[350px];
      cursor-pointer;
      rounded-lg;
      bg-[var(--column-bg)]
      border-2
      border-[var(--font-color)]
      p-4
      ring-rose-500
      hover:ring-2
      flex
      items-center
      gap-2
      '
					>
						<PlusIcon />
						Add Column
					</button>
				</div>
				{createPortal(
					<DragOverlay>
						{activeColumn && (
							<ColumnContainer
								column={activeColumn}
								deleteColumn={deleteColumn}
								updateColumn={updateColumn}
								createTask={createTask}
								tasks={tasks.filter(
									(task) => task.columnId === activeColumn.id
								)}
								deleteTask={deleteTask}
								updateTask={updateTask}
								createModal={createModal}
							/>
						)}
						{activeTask && (
							<TaskCard
								task={activeTask}
								deleteTask={deleteTask}
								updateTask={updateTask}
							/>
						)}
					</DragOverlay>,
					document.body
				)}
			</DndContext>
			{/* <Modal isVisible={showModal} onClose={() => setShowModal(false)} /> */}
		</div>
	);
}
