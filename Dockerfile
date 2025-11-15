FROM oven/bun:latest as builder
WORKDIR /app
COPY . .
RUN bun install --production

FROM gcr.io/distroless/base
WORKDIR /app
COPY --from=builder /app .
ENV PORT=8080
EXPOSE 8080
CMD ["bun", "run", "src/index.ts"]