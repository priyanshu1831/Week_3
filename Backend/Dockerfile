# # Stage 1
# FROM golang:alpine3.18 as builder
# WORKDIR /app
# # COPY go.mod, go.sum and download the dependencies
# COPY go.* ./
# RUN go mod download
# # COPY All things inside the project and build
# COPY . .
# RUN go build -o /main .
# # Stage 2
# FROM alpine:latest
# COPY --from=builder /main .
# EXPOSE 8080
# ENTRYPOINT [ "/main" ]



FROM golang:alpine3.18
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . .
RUN go build -o /main .
EXPOSE 8080
ENTRYPOINT [ "/main" ]