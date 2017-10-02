# Sala.mesh :fire:
> A ThreeJS + audio experience :fire: :sparkles:

> :warning: Disclaimer: Charmander and all audio featured here are property of Satoshi Taijiri, The Pokémon Company, Nintendo etc etc. Many thanks to them for this awesome licence. You guys are awesome :metal: :clap: Anyway, I just pulled awesome ressources together, nothing more :sparkles:

A demo is alive [here](https://naomihauret.github.io/sala.mesh).

## Get started
> :warning: `node` >6 and `npm` >5 are required to run this project.

> It should run fine on Linux, Windows and Mac OSX. I don't know. Otherwise, feel free to hit issue.

1. Clone this repo
2. `cd` into the repo folder
3. In a terminal, launch `npm install`

To start **dev mode**, launch `npm start`. This will launch webpack devserver. If you didn't change webpack config in `webpack.config.js`, it should be available at `localhost:9000`.

To start **prod mode**, launch `npm run test:prod`. Same as above, you should see stuff happening at `localhost:9000`.

### About dev mode
Assets (music, images etc.) will be automatically get bundled through Webpack. Also, you can test stuff on multiple devices at once thanks to Webpack devserver `host` feature. To do so, you got to get your IP address and hit it, suffixed with the port on which the devserver is running. For instance, `195.145.0.10:9000`. You can read the [docs about this feature](https://webpack.js.org/configuration/dev-server/#devserver-host) if you're interested by it.

In dev mode, assets are **not minified/optimized** and sourcemaps are available.

### About production mode
In production mode, assets are minified/optimized and sourcemaps are **not available**.


:checkered_flag: **That's all folks!**
