FROM node:18
WORKDIR /app
COPY package.json .
COPY app.js .
COPY public ./public
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]