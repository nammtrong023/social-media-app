# B1: cài môi trường Node
FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]

# docker build . -t node36
# . : tìm file Dockerfile để build image

# build container dựa vào image
# docker run -d -p 8081:8080 --name node36_container node36