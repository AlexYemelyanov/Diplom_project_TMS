export type TaskKanban = {
    title: string;
    description: string;
    status: string;
    subtasks: {
        title: string;
        isCompleted: boolean;
    }[];
}