package main

import (
	"database/sql"
	"log"
	"mime/multipart"
	"net/http"
	"path/filepath"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func getData(db *sql.DB) ([]FormData, error) {
	query := "SELECT * FROM leaves order by id desc;"
	rows, err := db.Query(query)
	if err != nil {
		log.Println("Failed to fetch leave requests:", err)
		return nil, err
	}
	defer rows.Close()

	leaveRequests := []FormData{}

	for rows.Next() {
		var lr FormData
		err := rows.Scan(
			&lr.LeaveID,
			&lr.EmployeeName,
			&lr.LeaveType,
			&lr.LeaveFrom,
			&lr.LeaveTo,
			&lr.TeamName,
			&lr.ManagerName,
			&lr.LeaveDuration,
			&lr.FilePath,
		)
		if err != nil {
			log.Println("Failed to scan leave request:", err)
			return nil, err
		}
		leaveRequests = append(leaveRequests, lr)
	}

	return leaveRequests, nil
}
func getDataForPieDevops(db *sql.DB) ([]Data, error) {
	query := "SELECT * FROM kpi6 where team_name='dev ops'"
	rows, err := db.Query(query)
	if err != nil {
		log.Println("Failed to fetch leave requests:", err)
		return nil, err
	}
	defer rows.Close()

	pie_data_devops := []Data{}

	for rows.Next() {
		var lr Data
		err := rows.Scan(
			&lr.Leaves,
			&lr.TeamName,
			&lr.LeaveType,
		)
		if err != nil {
			log.Println("Failed to scan leave request:", err)
			return nil, err
		}
		pie_data_devops = append(pie_data_devops, lr)
	}

	return pie_data_devops, nil
}

func getDataForPieIT(db *sql.DB) ([]Data, error) {
	query := "SELECT * FROM kpi6 where team_name='IT'"
	rows, err := db.Query(query)
	if err != nil {
		log.Println("Failed to fetch leave requests:", err)
		return nil, err
	}
	defer rows.Close()

	pie_data_it := []Data{}

	for rows.Next() {
		var lr Data
		err := rows.Scan(
			&lr.Leaves,
			&lr.TeamName,
			&lr.LeaveType,
		)
		if err != nil {
			log.Println("Failed to scan leave request:", err)
			return nil, err
		}
		pie_data_it = append(pie_data_it, lr)
	}

	return pie_data_it, nil
}

func getDataForBar(db *sql.DB) ([]BarData, error) {
	query := "SELECT * FROM kpi4"
	rows, err := db.Query(query)
	if err != nil {
		log.Println("Failed to fetch leave requests:", err)
		return nil, err
	}
	defer rows.Close()

	bar_data := []BarData{}

	for rows.Next() {
		var lr BarData
		err := rows.Scan(
			&lr.COUNT,
			&lr.ManagerName,
		)
		if err != nil {
			log.Println("Failed to scan leave request:", err)
			return nil, err
		}
		bar_data = append(bar_data, lr)
	}

	return bar_data, nil
}


func getDataForTable(db *sql.DB) ([]TableData, error) {
	query := "SELECT * FROM kpi3"
	rows, err := db.Query(query)
	if err != nil {
		log.Println("Failed to fetch leave requests:", err)
		return nil, err
	}
	defer rows.Close()

	table_data := []TableData{}

	for rows.Next() {
		var lr TableData
		err := rows.Scan(
			&lr.EmployeeName,
			&lr.COUNT,
			&lr.RANK,
		)
		if err != nil {
			log.Println("Failed to scan leave request:", err)
			return nil, err
		}
		table_data = append(table_data, lr)
	}

	return table_data, nil
}

func postData(c *gin.Context, db *sql.DB) {
	var formdata FormData
	if err := c.ShouldBind(&formdata); err != nil {
		log.Println("Failed to bind form data:", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to bind form data",
		})
		return
	}

	if formdata.EmployeeName == "" || formdata.LeaveType == "" || formdata.LeaveFrom == "" || formdata.LeaveTo == "" || formdata.TeamName == "" || formdata.ManagerName == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Missing or invalid fields in the request",
		})
		return
	}

	absUploadDir, err := filepath.Abs("static/upload/")
	if err != nil {
		log.Println("Failed to get absolute upload directory path:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process file upload"})
		return
	}

	relativeFilePath := "" // This will remain empty if no file is uploaded.

	if formdata.LeaveType == "Sick" {
		file, err := c.FormFile("file")
		if err != nil {
			log.Println("Failed to fetch file from frontend:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error occurred while fetching the file from frontend"})
			return
		}

		// Validate file type and size (let's assume a size limit of 5MB for this example)
		if !isValidFileType(file) || file.Size > 5*1024*1024 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid or large file type"})
			return
		}

		relativeFilePath = filepath.Base(file.Filename)
		if err := c.SaveUploadedFile(file, filepath.Join(absUploadDir, filepath.Base(file.Filename))); err != nil {
			log.Println("Failed to save file:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
			return
		}
	}

	query := `INSERT INTO leaves (employee_name, leave_type, leave_from, leave_to, team_name, manager_name, file_path) VALUES ($1, $2, $3, $4, $5, $6, $7)`
	_, err = db.Exec(query, formdata.EmployeeName, formdata.LeaveType, formdata.LeaveFrom, formdata.LeaveTo, formdata.TeamName, formdata.ManagerName, relativeFilePath)
	if err != nil {
		log.Println("Failed to insert leave request:", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to insert leave request",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Data Saved Successfully",
	})
}

func isValidFileType(file *multipart.FileHeader) bool {
	extension := filepath.Ext(file.Filename)
	return extension == ".pdf" || extension == ".png"
}
