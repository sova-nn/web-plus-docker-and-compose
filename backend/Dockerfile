FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev --no-audit --no-fund \
    && npm i -g pm2

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]