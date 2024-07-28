# Techsavvy API (revamp)

Migration is in progress from [old repo](https://github.com/s8srahme/techsavvy).

## What is inside?

This project uses lot of stuff, such as:

- [Express](http://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Getting Started

#### Clone repo:

```bash
git clone https://github.com/s8srahme/techsavvy-api
```

#### Install dependencies:

```bash
cd [YOUR_PROJECT_NAME]
nvm use
npm install
```

#### Start development server:

```bash
npm run dev
```

Now you're ready to rumble!

## Scripts

| Description                                          | Command           |
| :--------------------------------------------------- | :---------------- |
| Start development server                             | `dev`             |
| Serve production build                               | `start`           |
| Create production build                              | `build`           |
| Analyze code to find problems                        | `lint:check`      |
| Fix JS & TS code problems automatically              | `lint:fix`        |
| Check if JS & TS code conforms to a consistent style | `prettier:check`  |
| Format files to conform to a consistent style        | `prettier:format` |

## Deployment

Techsavvy API was initially deployed in parallel with [Techsavvy frontend](https://github.com/s8srahme/tech-savvy) on an AWS EC2 instance. Currently the instance is unavailable due to some technical issues.

## License

This project is licensed under GNU General Public License, Copyright (c) 2024 Sabbir Ahmed. For more information see `LICENSE.md`.
