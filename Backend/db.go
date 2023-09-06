package main

import (
    "database/sql"
    "fmt"
    "os"
    _ "github.com/lib/pq"
)

func connectDB() (*sql.DB, error) {
    
    os.Setenv("host","localhost")
    os.Setenv("port","5432")
    os.Setenv("user","postgres")
    os.Setenv("password","Priyanshu12!")
    os.Setenv("dbname","postgres")

    var host = os.Getenv("host")
    var port = os.Getenv("port")
    var user = os.Getenv("user")
    var password = os.Getenv("password")
    var dbname = os.Getenv("dbname")

    psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
    db, err := sql.Open("postgres", psqlInfo)
    if err != nil {
        return nil, err
    }

    err = db.Ping()
    if err != nil {
        return nil, err
    }

    fmt.Println("Successfully connected to the database!")
    return db, nil
}