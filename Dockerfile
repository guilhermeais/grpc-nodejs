FROM node:16
WORKDIR /app
COPY . .
RUN chmod +x scripts/gen.sh
RUN npm install
