FROM node:14-alpine3.11 as Builder
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

COPY src ./src/
RUN NODE_ENV=production npm run build


FROM node:14-alpine3.11 as Fetcher
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --prod


FROM node:14-alpine3.11
COPY --from=Builder /app/package.json /app/
COPY --from=Builder /app/dist /app/dist
COPY --from=Fetcher /app/node_modules /app/node_modules

WORKDIR /app
ENV NODE_ENV=production
CMD ["node", "--loader", "@k-foss/ts-esnode", "--experimental-specifier-resolution=node", "--harmony-top-level-await", "--harmony-optional-chaining", "dist/index.js"]