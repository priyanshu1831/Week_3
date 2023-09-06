package main

import (
"bytes"
"mime/multipart"
"net/http"
"net/http/httptest"
"testing"
"github.com/gin-gonic/gin"
)

func SetUp_Router() *gin.Engine {
	router := gin.Default()
	router.POST("/postData", func(c *gin.Context) {
	c.String(http.StatusOK, "Form data saved successfully")
	})
	router.GET("/getData", func(c *gin.Context) {
	c.String(http.StatusOK, "Data retrieved successfully")
	})
	return router
}

func Test_API_Endpoints(t *testing.T) {
	router := SetUp_Router()
	
	// Test POST endpoint
	payload := map[string]string{
	"employee_name": "Sunny",
	"leave_type": "Earned",
	"leave_from": "2022-11-02",
	"leave_to": "2022-11-03",
	"team_name": "satluj",
	"manager_name": "suraj",
	}

	var Buf bytes.Buffer
	w := multipart.NewWriter(&Buf)
	for key, value := range payload {
		_ = w.WriteField(key, value)
	}

	Post_Req, err := http.NewRequest("POST", "/postData", &Buf)
	if err != nil {
		t.Fatalf("Failed to create POST request: %v", err)
	}
	Post_Req.Header.Set("Content-Type", w.FormDataContentType())

	Post_Rec := httptest.NewRecorder()
	router.ServeHTTP(Post_Rec, Post_Req)

	if Post_Rec.Code != http.StatusOK {
		t.Errorf("Expected POST status code %d, but got %d", http.StatusOK, Post_Rec.Code)
	}

	expectedPostResponse := "Form data saved successfully"
	if Post_Rec.Body.String() != expectedPostResponse {
		t.Errorf("Expected POST response '%s', but got '%s'", expectedPostResponse, Post_Rec.Body.String())
	}

	// Testing GET endpoint
	Get_Req, err := http.NewRequest("GET", "/getData", nil)
	if err != nil {
		t.Fatalf("Failed to create GET request: %v", err)
	}

	Get_Rec := httptest.NewRecorder()
	router.ServeHTTP(Get_Rec, Get_Req)

	if Get_Rec.Code != http.StatusOK {
		t.Errorf("Expected GET status code %d, but got %d", http.StatusOK, Get_Rec.Code)
	}

	expectedGetResponse := "Data retrieved successfully"
	if Get_Rec.Body.String() != expectedGetResponse {
		t.Errorf("Expected GET response '%s', but got '%s'", expectedGetResponse, Get_Rec.Body.String())
	}
}