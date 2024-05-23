FROM node:21.1.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# make sure the script is executable
RUN chmod +x /app/curl-script.sh

CMD ["sh", "-c", "npm start & sh /app/curl-script.sh"]
