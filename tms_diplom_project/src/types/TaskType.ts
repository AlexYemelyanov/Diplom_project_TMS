import { Id } from "./ColumnType";

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
}