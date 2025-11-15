FROM oven/bun

WORKDIR /app

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY ./src ./src
COPY ./.env ./.env

CMD ["bun",  "src/index.ts"]