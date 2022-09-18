const fs = require('fs/promises');
const fss = require('fs')
const seasons = require('./src/data/seasons.json');

async function generate() {
    const genDir = `${__dirname}/src/components/image-gen`

    console.log(`Looking for ${genDir}`)
    if(!fss.existsSync(genDir)) {
        console.log(`Creating ${genDir} directory`)
        await fs.mkdir(genDir)
        console.log("Success")
    }

    let indexImports = "";
    let indexExports = "";
    let smartSelectorImports = "// Auto Generated\nimport React from 'react'\nimport {";
    let smartSelectorBody = "export interface SmartSelectorProps {season: number; className?: string}\nexport default function SmartSelector(props: SmartSelectorProps) {\nlet selected:JSX.Element = <></> \nswitch(props.season) {\n"

    for(let i = 0; i < seasons.length; i++) {
        const season = seasons[i];
        const fileNameLowercase = season.icon.split('.')[0];
        const fileName = fileNameLowercase[0].toUpperCase() + fileNameLowercase.slice(1).toLowerCase();

        const path = `${genDir}/${fileName}.tsx`;

        await deleteFile(path)
        
        const content = `// Auto generated
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

export interface ${fileName}Props {
    className?: string
}

export default function ${fileName}(props: ${fileName}Props) {
    return (
        <StaticImage src="${__dirname}/src/images/${season.icon}" alt="${season.title}" className={props.className}/>
    )
}`
        await writeFile(path, content)

        indexImports += `import ${fileName}Import from './${fileName}'; \n`
        indexExports += `export const ${fileName} = ${fileName}Import; \n`

        smartSelectorImports += `${fileName},\n`
        smartSelectorBody += `case ${season.number}:\nselected = <${fileName} className={props.className}/>\nbreak;\n`
    }

   
    indexImports += "import SmartSelectorImport from './SmartSelector' \n"
    indexExports += "export const SmartSelector = SmartSelectorImport"

    smartSelectorImports += "} from '.'\n\n"
    smartSelectorBody += "}\nreturn selected\n}"
    const smartSelectorPath = `${genDir}/SmartSelector.tsx`
    const smartSelectorContent = smartSelectorImports + smartSelectorBody;

    await deleteFile(smartSelectorPath)

    await writeFile(smartSelectorPath, smartSelectorContent)

    const indexContent = "// Auto generated \n" + indexImports + '\n' + indexExports
    
    const indexPath = `${genDir}/index.ts`

    await deleteFile(indexPath);

    await writeFile(indexPath, indexContent);

    async function deleteFile(path) {
        if(fss.existsSync(path)) {
            console.log(`Deleting existing ${path}`)
            await fs.unlink(path);
            console.log('Success')
        }
    }

    async function writeFile(path, content) {
        console.log(`Writing file ${path}`)
        await fs.writeFile(path, content);
        console.log('Success')
    }
}

generate()