FROM node:22-trixie-slim

WORKDIR /app

COPY . .
RUN npm install


ARG PORT=3000
EXPOSE ${PORT}

CMD ["sh", "-c", "npm run db:migrate && npm run dev"]