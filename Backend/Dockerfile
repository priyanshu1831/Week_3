# Stage 1
FROM golang:alpine3.18 as builder
WORKDIR /project/go-docker/
# COPY go.mod, go.sum and download the dependencies
COPY go.* ./
RUN go mod download
# COPY All things inside the project and build
COPY . .
RUN go build -o /project/go-docker/build/myapp .
# Stage 2
FROM alpine:latest
COPY --from=builder /project/go-docker/build/myapp /project/go-docker/build/myapp
EXPOSE 8080
ENTRYPOINT [ "/project/go-docker/build/myapp" ]