# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build:all

# Stage 2: Serve
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist/apps/shell/browser /app/shell
COPY --from=builder /app/dist/apps/admin/browser /app/admin

CMD ["sh", "-c", "serve -p 4201 shell & serve -p 4202 admin"]