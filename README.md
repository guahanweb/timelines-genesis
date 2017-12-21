# React Boilerplate

This repo contains the baseline for setting up a Node.js backend with a React/Redux application bootstrapped in the client.

## Basic Usage

### With Docker

A Dockerfile has been provided with this app that will allow you to quickly spin up a container and run it locally.

#### Clone the repo and build the image

```sh
$ git clone <repository>
$ cd react-boilerplate
$ ./build
```

#### Run the container

```sh
$ docker run -i -p 3000:3000 \
  -e "HOST=0.0.0.0" \
  -e "PORT=3000" \
  -t guahanweb/react-boilerplate:$(cat version)
```

### Without Docker

If you are doing active development or simply want to run the app directly on your machine, you may do so from within the `/app` directory.

#### Clone the repo and install dependencies

```sh
$ git clone <repository>
$ cd react-boilerplate/app
$ npm i
```

#### Run the application

```sh
$ npm run dev
```

### View the application

Once you have the app running, you can view it in your browser at http://localhost:3000 (or whatever port you chose).