FROM node:latest AS ui-build
ADD ./frontend /app
WORKDIR /app

RUN npm install @vue/cli-service -g


# FROM node:latest AS server-build
# WORKDIR /usr/src/app/api
# COPY --from=ui-build /usr/src/app/dist ./frontend/dist
# COPY backend/package*.json ./backend/
# RUN cd backend && npm install
# COPY backend/ ./backend/

# CMD ["npm", "run", "prod"]

# EXPOSE 3000



# FROM node:latest AS server-build
# WORKDIR /app/api
# COPY --from=ui-build /app/dist ./frontend/dist
# COPY . ./backend
# RUN cd /app/api && npm install


# CMD ["npm", "run", "prod"]

# EXPOSE 3000
