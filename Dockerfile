FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY client/package*.json ./client/

RUN npm ci --legacy-peer-deps && \
    cd client && \
    npm ci --legacy-peer-deps && \
    npm run build && \
    cd ..

COPY . .

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "server.js"]
