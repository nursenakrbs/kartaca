FROM node:18-alpine
WORKDIR /kartaca
COPY public/ ./public
COPY src/ ./src
COPY package.json ./
RUN npm install
CMD ["npm", "start"]

