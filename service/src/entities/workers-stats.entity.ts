import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity("workers_stats", {
  expression: `
  SELECT 
  w."id" as "id", 
  w."firstName" as "firstName", w."lastName" as "lastName", w."middleName" as "middleName",
  count(i) as "itemsCount", sum(i."price") as "priceSum"
  FROM workers as w INNER JOIN items as i ON (w."id" = i."workerId")
  GROUP BY w."id"
  ORDER BY w."id"
  `,
})
export class WorkerStats {
  @ViewColumn()
  id: number;

  @ViewColumn()
  firstName: string;

  @ViewColumn()
  lastName: string;

  @ViewColumn()
  middleName: string;

  @ViewColumn()
  itemsCount: number;

  @ViewColumn()
  priceSum: number;
}
