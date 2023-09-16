package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func main() {
	router := gin.Default()

	// Connect to the database
	db, err := connectDB()
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}
	defer db.Close()

	// Create required table if not exists
	createTableQuery := `CREATE TABLE IF NOT EXISTS leaves ( leave_id SERIAL PRIMARY KEY, employee_name VARCHAR(255), leave_type VARCHAR(255), leave_from VARCHAR(255), leave_to VARCHAR(255), team_name VARCHAR(255), manager_name VARCHAR(255), file_path VARCHAR(255) );`
	_, err = db.Exec(createTableQuery)
	if err != nil {
		log.Fatal("Failed to create table:", err)
	}

	// Enable CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:4200"} // Adjust this to match your frontend URL
	config.AllowMethods = []string{"GET", "POST"}
	router.Use(cors.New(config))

	// Routes for GET and POST methods

	router.Static("/static", "./static")

	router.GET("/getData", func(c *gin.Context) {
		leaveRequests, err := getData(db)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Internal Server Error",
			})
			return
		}
		c.JSON(http.StatusOK, leaveRequests)
	})

	router.GET("/piechart/devops", func(c *gin.Context) {
		pie_data_devops, err := getDataForPieDevops(db)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Internal Server Error",
			})
			return
		}
		c.JSON(http.StatusOK, pie_data_devops)
	})

	router.GET("/piechart/it", func(c *gin.Context) {
		pie_data_it, err := getDataForPieIT(db)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Internal Server Error",
			})
			return
		}
		c.JSON(http.StatusOK, pie_data_it)
	})

	router.GET("/barchart", func(c *gin.Context) {
		pie_data, err := getDataForBar(db)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Internal Server Error",
			})
			return
		}
		c.JSON(http.StatusOK, pie_data)
	})

	router.GET("/tabledata", func(c *gin.Context) {
		pie_data, err := getDataForTable(db)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Internal Server Error",
			})
			return
		}
		c.JSON(http.StatusOK, pie_data)
	})

	router.POST("/postData", func(c *gin.Context) {
		postData(c, db)
	})

	router.Run(":8080")
}
