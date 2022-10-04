[Documentation](./docs/)

# yarn commands

## yarn develop

Steps:

1. runs [yarn generateImages](#yarn-generateimages) command
2. runs concurrently
    1. starts gatsby dev server
    2. starts typed scss modules generator

## yarn start

Steps:

1. runs [yarn develop](#yarn-develop) command

## yarn build

Steps:

1. runs [yarn generateImages](#yarn-generateimages) command
2. builds the static website

## yarn generateImages

Steps:

1. runs node image-generator.js
    1. creates ./src/components/image-gen directory
    2. creates {Season image}.tsx components
    3. creates SmartSelector.tsx component used to dynamically grab season images
    4. creates index.ts file for easy importing
