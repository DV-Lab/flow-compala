# [CompaLa](https://flow-compala.vercel.app/) 

## Tagline 
> Discover the differences: Compare LaLiga Golazos Moments with CompaLa

## The problem it solves
If you've ever purchased an NFT Moment on LaLiga Golazos Marketplace, you've probably experienced the confusion that comes with trying to choose the right one. Collectors often have to open multiple tabs to compare information such as highlights and edition data, which can quickly become messy. Despite the chaos, this process is necessary because it's difficult to compare Moments quickly otherwise. But imagine having a tool that allows you to easily place Moments side-by-side and identify the features that are most attractive to you. The ability to compare Moments with ease would be incredibly beneficial for collectors.

### Commands

- Run: `yarn install` for install all packages
- Run: `yarn dev` for start dev environment
- Run: `yarn build` for build your project
- Run: `yarn start` for start your built project
- Run: `yarn lint` for checking error and fix it

### Project structure

```
├── apis                # All apis come here
├── components          # All components that can share between screen
│   └── _template       # Template for component
├── locales             # I18N Language files
│   ├── en
│   └── vi
├── configs             # All configs and constant goes here
├── hooks               # Custom hooks for project
├── layouts             # Layouts of screen and components
├── pages               # Page file of NextJS (Use as router to screen folder)
├── public              # Public folder, contain static files
├── screens             # Screen component goes here
├── services            # All services goes here
├── states              # State managerment for app
│   └── app.ts           # Zustand state
├── styles              # App global styles (SCSS)
├── types               # App global type (Typescript)
└── utils               # App's utils
```

## Tech included

- `NextJS + Typescript` Base source
- [Zustand](https://github.com/pmndrs/zustand): State management
- `Cadence`: Write scripts to query on-chain data
- `Flow client library`: Interact with Flow blockchain
- `Husky` Git helper
- `SCSS modules` Style system
- `Eslint and Prettier` Rule of code


# Demo 
1. Link youtube: `https://youtu.be/4IbP9GE4phs`

![Cover photo](/docs/cover.png)

![Compare](/docs/1.png)

![Chart](/docs/2.png)

![Empty](/docs/3.png)

![Storage](/docs/4.png)
