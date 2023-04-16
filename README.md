![Website Teaser](docs/website-current.gif)

# Bürger:Beete

The open source website for our urban gardening initiative in Potsdam. Please feel free to copy or fork this project for your own urban gardening initiative or project in your own city or country ❤️

## Contact Us!

For any questions or if you need help to get started with this project please feel free to contact us via [info@buerger-beete.de](mailto:info@buerger-beete.de).


## Built with:

- Typescript
- React
- Gatsby
- Mapbox
- Matomo Tracking


## Development

### Setup Environment Variables

Copy the `.env.example` file to `.env` and fill in the required values. You will need to create a [Mapbox](https://www.mapbox.com/) account to get an API key and have to create your own mapbox style via the studio/designer web app.

### Install NPM Dependencies

To install all required dependencies, just run:

```shell
yarn install
```

### Start Local Dev Environment^

To start your local dev env, just run:

```shell
yarn start
```

## Production Build

To generate the static site and relevant assets you just need to run:

```shell
yarn run build
```

After that you can find the generated static site in the `public` folder which you can upload to a static file hosting service. Currently our version is hosted on Netcup.

## Hosting & Server Requirements

No php or whatsoever needed. Only a static webserver/webhosting is required to serve static html files and assets. 