FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "run", "src/index.ts"]