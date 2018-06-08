# MANIFESTO.ai web-site

## Development environment
- node.js (v9 up)
- npm (v6.1.0 up)
For initial setup please run:
```sh
npm i
```

## Configuration
Site config is placed in the file [./src/config.json](./src/config.json)  


## Creating of the build
Development build:
```sh
npm run dist
```
Production build:
```sh
npm run dist:prod
```
Builded web-site sources will be generated in the folder `./dist`
  
## Development
Startion of the development server:
```sh
npm start
```
