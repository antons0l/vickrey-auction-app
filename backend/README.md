# Backend API for Vickrey Auction app

```
npm install
npm run db:generate
npm run dev
```

```
npm run deploy
```


# DB modifications
To change DB schema, first make the changes in /src/db/schema.ts file.
Then run
```
npm run db:generate
```
It will generate a new migration file.
To deploy this migration on local db:
```
npx wrangler d1 execute vickrey-auction-db --local --file=./src/db/migrations/0000_careless_gertrude_yorkes.sql
```
To deploy to prod db:
```
npx wrangler d1 execute vickrey-auction-db --remote --file=./src/db/migrations/0000_careless_gertrude_yorkes.sql
```