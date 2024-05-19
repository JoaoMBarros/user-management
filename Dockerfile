FROM node:latest AS builder

RUN mkdir -p app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

RUN npm run build

CMD ["npm", "run", "dev"]