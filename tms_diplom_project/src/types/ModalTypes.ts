import { Id } from "./ColumnType";


export type Modal = {
  id: Id,
  taskId: Id,
  title: string,
  description: string,
  team: Array<[]>
}