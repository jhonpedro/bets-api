FROM node:16-alpine3.11
WORKDIR /tgl/
COPY . .
RUN rm .env
COPY .env.docker .env
RUN npm i
EXPOSE 3333
CMD ["npm", "start"]
