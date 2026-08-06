FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
COPY backend/package.json backend/package-lock.json ./backend/
COPY src/package.json src/package-lock.json ./src/

RUN npm install \
  && npm install --prefix backend \
  && npm install --prefix src

COPY . .

RUN npm run build --prefix src

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]
