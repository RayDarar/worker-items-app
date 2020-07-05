SELECT 
w."id" as "id", 
w."firstName" as "firstName", w."lastName" as "lastName", w."middleName" as "middleName",
count(i) as "itemsCount", coalesce(sum(i."price"), 0) as "priceSum"
FROM workers as w LEFT JOIN items as i ON (w."id" = i."workerId")
GROUP BY w."id"
ORDER BY w."id";