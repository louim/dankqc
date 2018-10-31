# DANKQC

What is dankqc? Dankqc is an attempt at tracking [SQDC](https://www.sqdc.ca) in stock inventory.

## How to run

```
yarn install
yarn dev
```

This will install dependencies an run the dev server for you.

## Todo

This bot started has an idea from a work colleague. The bot in his final form would tweet when items come back in stock on the website. What's currently missing?

*Missing features*

- Some kind of persistence (Redis? NoSQL db? Old trusty Postgres?)
- A cron system to run the check at a certain frequency
- Product variant details. What formats are in stock?
- Connecting in / posting to Twitter
- A production setup

*What could be improved?*

- Linting
- Rate limiting
- Code structure (still very hackish)
- Logging
- Tooling
- Unit testing

© Louis-Michel Couture 2018
