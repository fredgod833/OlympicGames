# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
  -     info-box green box designed to present numeric information under the title
  -     charts-header contain title for this page and a collection of info-boxes
  
- `pages` folder: contains components used for routing
  -     home : page designed to present first view with pie graph
  -     country-detail : page that present graphic evolution of medals for one selected country.
  
- `core` folder: contains the business logic (`services` and `models` folders)
  - layout-service : contain
    -     associate color to one country
    -     compute available space for the graph (helps responsive design)
    
  - Olympic Service
    - retrieve olympics data and manage caching


Good luck!
