FROM node:latest

WORKDIR /app
COPY . /app

RUN npm install

COPY ./ ./

CMD [ "npm", "run", "prod" ]
# RUN npm run prod

EXPOSE 3000
