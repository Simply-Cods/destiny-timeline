const fs = require('fs/promises');
const fss = require('fs')
const seasons = require('./src/data/seasons.json');

async function generate() {
    const genDir = `${__dirname}/src/components/image-gen`
    await setupDir();
    let rootIndexImport = ""
    let rootIndexExport = ""
    await generateSeasonIcons();
    const rootIndexContent = "// Auto generated\n" + rootIndexImport + rootIndexExport;
    await write(genDir + "/index.ts", rootIndexContent)

    async function setupDir() {    
        await mkdir(genDir);
    }
    
    async function generateSeasonIcons() {
        const seasonIconsDir = `${__dirname}/src/images/seasons`
        const seasonsDir = `${genDir}/seasons`
        await mkdir(seasonsDir);
        const seasonIconImport = `import React from 'react'\nimport {StaticImage} from 'gatsby-plugin-image'\nimport {IStaticImageProps} from 'gatsby-plugin-image/dist/src/components/static-image.server'\n\n`
        let seasonIconBody = `export default function SeasonIcon({season,...props}:{season:number}&Omit<IStaticImageProps,"src"|"alt">){\nlet selected:JSX.Element=<></>\nswitch(season){\n`

        for(let i = 0; i< seasons.length; i++) {
            const season = seasons[i];
            seasonIconBody += `case ${season.number}:\nselected=<StaticImage src="${seasonIconsDir}/${season.icon}" alt="${season.title}" {...props}/>\nbreak;\n`
        }
        seasonIconBody += "}\nreturn selected\n}"

        seasonIconContent = "// Auto generated\n" + seasonIconImport + seasonIconBody;

        const seasonIconElementDir = `${seasonsDir}/SeasonIcon.tsx`

        await write(seasonIconElementDir, seasonIconContent)
        const indexDir = `${seasonsDir}/index.ts`
        const indexContent = "import SeasonIcon from './SeasonIcon'\nexport default SeasonIcon"
        await write(indexDir, indexContent)

        rootIndexImport += "import SeasonIconImport from './seasons'\n"
        rootIndexExport += "export const SeasonIcon = SeasonIconImport\n"
    }
    
    async function mkdir(path) {
        console.log(`Looking for ${path}`)
        if(!fss.existsSync(path)) {
            console.log(`Creating ${path} directory`)
            await fs.mkdir(path)
            console.log("Success")
        }
    }

    async function write(path, content) {
        if(fss.existsSync(path)) {
            console.log(`Deleting existing ${path}`)
            await fs.unlink(path);
            console.log('Success')
        }
        console.log(`Writing file ${path}`)
        await fs.writeFile(path, content);
        console.log('Success')
    }
}



generate()