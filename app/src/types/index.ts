export interface TableHeader {
  label: string;
  width: string;
  key: string;
}

export interface TableRowItem {
  id: number;
}
export type TableRow = object & TableRowItem;

export enum ButtonSize {
  SMALL = "small",
  MEDIUM = "medium",
  BIG = "big",
}
