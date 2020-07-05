export interface TableHeader {
  label: string;
  width: string;
  key: string;
}

export interface TableRowItem {
  id: number;
  [index: string]: any;
}
export type TableRow = object & TableRowItem;

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  BIG = "big",
}
