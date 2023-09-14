FROM node:16-alpine
WORKDIR /app
RUN npm install -g @angular/cli@13
COPY . .
RUN npm ci 
CMD ["ng", "serve"]
EXPOSE 4200