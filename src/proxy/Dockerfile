FROM node:16.16.0-alpine
WORKDIR /mongoproxy
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm ci --silent
COPY . ./
EXPOSE 3001
CMD ["node", "src/proxy/proxy-server.js"]
