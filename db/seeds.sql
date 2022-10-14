INSERT INTO department (name)
VALUES ("produce"), 
("dairy"), 
("meat");


INSERT INTO role ( title , salary , department_id)
VALUES
("butcher", 80000 , 3),
("milk man", 70000 , 2),
("tallyman", 30000, 1);


INSERT INTO employee (firstName , lastName , role_id , manager_id)
VALUES
("Jeff","Lebowski", 1, NULL ),
("Lars" , "Witowski", 2, 1),
("jim" , "hanks", 3, 2);