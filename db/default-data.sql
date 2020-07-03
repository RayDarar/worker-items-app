INSERT INTO workers("firstName", "lastName", "middleName") VALUES('Ансар', 'Рыспеков', 'Кайратович');
INSERT INTO items("workerId", "name", "price") VALUES(currval('workers_id_seq'), 'Ноутбук Asus', 350000);
INSERT INTO items("workerId", "name", "price") VALUES(currval('workers_id_seq'), 'Телефон Samsung J7', 50000);
INSERT INTO items("workerId", "name", "price") VALUES(currval('workers_id_seq'), 'Часы Mi-Band 4', 12000);

INSERT INTO workers("firstName", "lastName", "middleName") VALUES('Томирис', 'Рыспекова', 'Кайратовна');
INSERT INTO items("workerId", "name", "price") VALUES(currval('workers_id_seq'), 'IPhone 7S', 200000);

INSERT INTO workers("firstName", "lastName", "middleName") VALUES('Асемгуль', 'Талгатбекова', 'Талгатбековна');
INSERT INTO items("workerId", "name", "price") VALUES(currval('workers_id_seq'), 'Ноутбук Lenovo', 250000);
INSERT INTO items("workerId", "name", "price") VALUES(currval('workers_id_seq'), 'Телефон Samsung', 100000);
