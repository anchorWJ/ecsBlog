FROM node:latest as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
CMD [ "npm", "run", "prod" ]
# RUN npm run prod


FROM nginx:latest as production-stage
RUN mkdir /app
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

