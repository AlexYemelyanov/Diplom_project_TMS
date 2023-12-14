export type Board = {
    name: string;
    isActive: boolean;
    columns: {
        name: string;
        tasks: {
            title: string;
            description: string;
            status: string;
            subtasks: {
                title: string;
                isCompleted: boolean;
            }[];
        }[];
    }[];
}