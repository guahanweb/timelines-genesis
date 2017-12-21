FROM node
LABEL author="Garth Henson"
LABEL maintainer="garth@guahanweb.com"
EXPOSE 3000

COPY app /app
WORKDIR /app

RUN npm i
CMD npm start
