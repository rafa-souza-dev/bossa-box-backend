FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install --production

COPY . .

RUN npm run build
RUN npx prisma generate

EXPOSE 8000

CMD [ "npm", "run", "start" ]
