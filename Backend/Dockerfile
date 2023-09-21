FROM golang:alpine3.18
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN go build -o /main .
EXPOSE 8080
# ENTRYPOINT [ "/main" ]
CMD ["/main"]