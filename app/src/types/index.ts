export interface TableHeader {
  label: string;
  width: string;
  key: string;
  type: string;
}

export interface TableRowItem {
  id: number;
  [index: string]: any;
}
export type TableRow = object & TableRowItem;

export interface ContextItem {
  event: string;
  label: string;
}

export interface Worker {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  items: WorkerItem[];
  status: Status;
}

export interface WorkerItem {
  id: number;
  name: string;
  price: number;
  status: Status;
}

export type Status = "new" | "delete" | "update";

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  BIG = "big",
}
