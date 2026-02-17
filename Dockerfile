FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

WORKDIR /app/client

RUN npm ci && npm run build

WORKDIR /app

EXPOSE 5000

CMD ["npm", "start"]
