FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

COPY .  ./

RUN bun install

COPY . .

CMD bun run dev