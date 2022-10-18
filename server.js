const inquirer = require("inquirer");
const mysql = require("mysql2")
require("console.table");


const db = mysql.createConnection(
    {
        host: 'localhost',

        user: 'root',

        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the movies_db database.`)
);

const veiwEmployees = async () => {
    const data = await db.promise().query("SELECT employee.firstName, employee.lastName, manager.firstName as manager, role.title, department.name as department FROM employee JOIN role on role_id = role.id LEFT JOIN employee manager on employee.manager_id = manager.id JOIN department on department.id = role.department_id")
    console.table(data[0])
    mainMenu()

}
const veiwRoles = async () => {
    const data = await db.promise().query("SELECT role.title, role.salary, department.name FROM role JOIN department on department.id = role.department_id")
    console.table(data[0])
    mainMenu()
}
const veiwDepartment = async () => {
    const data = await db.promise().query(" SELECT department.name FROM department")
    console.table(data[0])
    mainMenu()
}
const addDepartment = async () => {
    const answer = await inquirer.prompt([{
        type: "input",
        name: "name",
        message: "what is the department name?"
    }])
    const data = await db.promise().query("INSERT INTO department SET ?", answer)
    veiwDepartment()
}
const addRole = async () => {
    const dept = await db.promise().query("select id as value, name as name FROM department")
    const answer = await inquirer.prompt([{
        type: "list",
        name: "department_id",
        message: "What is the department?",
        choices: dept[0]
    },
    {
        type: "input",
        name: "salary",
        message: "What would you like to pay this employee?",
    },
    {
        type: "input",
        name: "title",
        message: "What is the job title?",
    }])
    const data = await db.promise().query("INSERT INTO role SET ?", answer)
    veiwRoles()
};
const addEmployee = async () => {
    const role_id = await db.promise().query("select id as value, title as name FROM role")
    const manager_id = await db.promise().query("select id as value, lastName as name FROM employee")
    const answer = await inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: "What is the first name of the employee?",
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the last name of the employee?",
    },
    {
        type: "list",
        name: "role_id",
        message: "What is the employee role?",
        choices: role_id[0],
    },
    {
        type: "list",
        name: "manager_id",
        message: "Who is the manager of the employee?",
        choices: manager_id[0],
    },
    ])
    const data = await db.promise().query("INSERT INTO employee SET ?", answer)
    veiwEmployees()
};

const updateEmployee = async () => {
    const id = await db.promise().query("select id as value, lastName as name FROM employee")
    const role_id = await db.promise().query("select id as value, title as name FROM role")
    const answer = await inquirer.prompt([{
        type: "list",
        name: "id",
        message: "select employee",
        choices: id[0],
    },
    {
        type:"list",
        name:"role_id",
        message:"select role",
        choices: role_id[0],
    }])
    const data = await db.promise().query("update employee SET role_id = ? WHERE id = ?", [answer.role_id, answer.id])
    veiwEmployees()
}

const mainMenu = async () => {
    const answer = await inquirer.prompt([{
        type: "list",
        name: "name",
        message: "what do you want to do",
        choices: ["Veiw Employees", "Veiw Departments", "Veiw Roles", "Add Department", "Add Role", "Add Employee", "Update Employee"]

    }])
    switch (answer.name) {
        case "Veiw Employees":
            veiwEmployees()
            break
        case "Veiw Departments":
            veiwDepartment()
            break
        case "Veiw Roles":
            veiwRoles()
            break
        case "Add Department":
            addDepartment()
            break
        case "Add Role":
            addRole()
            break
        case "Add Employee":
            addEmployee()
            break
            case "Update Employee":
            updateEmployee()
            break
    }
}
mainMenu()