## React + Stripe Ecommerce Store Template

Based on [react-stripe-store](https://github.com/binx/react-stripe-store)

### Quickstart
```
yarn install
yarn start
```
This will open a browser tab with the store running. The config file in `/src/assets/` will be running the store, and at first you should see one product. The `$Infinity - $-Infinity` price tag is notifying us that there is an error connecting to the Stripe account, which we hope would be true since we haven't set a stripe key or a stripe product ID yet!
