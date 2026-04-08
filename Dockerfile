FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src

EXPOSE 3000

# initContainer 없이 단일 컨테이너로 쓸 때는 여기서 migrate 실행
CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]
