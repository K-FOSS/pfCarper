FROM node:13-alpine3.11 as Builder
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm ci

COPY src ./src/

RUN NODE_ENV=production npm run build


FROM node:13-alpine3.11 as Fetcher
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache python3 build-base

COPY package.json package-lock.json ./

RUN npm ci --prod


FROM node:13-alpine3.11
COPY --from=Builder /app/package.json /app/
COPY --from=Builder /app/dist /app/dist
COPY --from=Fetcher /app/node_modules /app/node_modules

CMD ["node", "/app/dist/index.js"]