# Timelines: Genealogies

This repo is a pet project to use D3 to visually graph biblical genealogies in a timeline. Overlapping major events can give a bit more perspective on the state of the world during those times.

## Visual Timeline

Using D3, we are generating a customizable SVG with interactions to allow for a lot of flexibility. You can see the timeline running on our GitHub Pages for this project.

## Basic Usage

### With Docker

A Dockerfile has been provided with this app that will allow you to quickly spin up a container and run it locally.

#### Clone the repo and build the image

```sh
$ git clone <repository>
$ cd timelines-genesis
$ ./build
```

#### Run the container

```sh
$ docker run -i -p 3000:3000 \
  -e "HOST=0.0.0.0" \
  -e "PORT=3000" \
  -t guahanweb/timelines-genesis:$(cat version)
```

### Without Docker

If you are doing active development or simply want to run the app directly on your machine, you may do so from within the `/app` directory.

#### Clone the repo and install dependencies

```sh
$ git clone <repository>
$ cd timelines-genesis/app
$ npm i
```

#### Run the application

```sh
$ npm run dev
```

### View the application

Once you have the app running, you can view it in your browser at http://localhost:3000 (or whatever port you chose).