FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client inside Docker
RUN npx prisma generate

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "dev"]
