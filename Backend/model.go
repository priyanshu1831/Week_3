package main

type FormData struct {
	LeaveID      int    `db:"leave_id" json:"leave_id" form:"leave_id"`
	EmployeeName string `db:"employee_name" json:"employee_name" form:"employee_name"`
	LeaveType    string `db:"leave_type" json:"leave_type" form:"leave_type"`
	LeaveFrom    string `db:"leave_from" json:"leave_from" form:"leave_from"`
	LeaveTo      string `db:"leave_to" json:"leave_to" form:"leave_to"`
	TeamName     string `db:"team_name" json:"team_name" form:"team_name"`
	ManagerName  string `db:"manager_name" json:"manager_name" form:"manager_name"`
	FilePath     string `db:"file_path" json:"file_path" form:"file_path"`
}

type Data struct {
	Leaves    float32 `db:"leave_id" json:"leave_id" form:"leave_id"`
	TeamName  string  `db:"team_name" json:"team_name" form:"team_name"`
	LeaveType string  `db:"leave_type" json:"leave_type" form:"leave_type"`
}

type BarData struct {
	COUNT       int    `db:"count" json:"count" form:"count"`
	ManagerName string `db:"manager_name" json:"manager_name" form:"manager_name"`
}

type TableData struct {
	EmployeeName string `db:"employee_name" json:"employee_name" form:"employee_name"`
	COUNT        int    `db:"count" json:"count" form:"count"`
	RANK         int    `db:"rank" json:"rank" form:"rank"`
}
