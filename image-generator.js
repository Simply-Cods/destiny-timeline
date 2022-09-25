const fs = require('fs/promises');
const fss = require('fs');
const path = require('node:path');
const seasons = require('./src/data/seasons.json');

async function generate() {
    //const genDir = `${__dirname}/src/components/image-gen`
    const genDir = path.normalize(path.join(__dirname, 'src', 'components', 'image-gen'))
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
        const subDir = path.join(genDir, 'seasonIcons')
        await mkdir(subDir);

        const file = path.join(genDir, 'SeasonIcon.tsx')

        let imports = `import React from 'react'
import { GatsbyImageProps } from 'gatsby-plugin-image'\n`

        let body = `export default function SeasonIcon({ 
    season, 
    ...props 
}: {
    season: number
} & Omit<GatsbyImageProps, 'image' | 'alt'>){
    let selected = <></>
    switch(season) {\n`

        for(let i = 0; i < seasons.length; i++) {
            const season = seasons[i];
            const iconName = getNameFromFilePath(season.icon)
            const subFile = path.join(subDir, `${iconName}.tsx`)

            const subContent = `// Auto generated
import React from 'react'
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage, GatsbyImageProps } from "gatsby-plugin-image"

export default function ${iconName}(props: Omit<GatsbyImageProps, 'image' | 'alt'>) {
    const data = useStaticQuery(graphql\`
        query ${iconName}ImageQuery {
            file(relativePath: {eq: "seasons/${season.icon}"}) {
                childImageSharp {
                    gatsbyImageData(transformOptions: {grayscale: true})
                }
            }
        }
    \`)
    const image = getImage(data.file)
    return (
        <>
            {image && <GatsbyImage image={image} alt='${season.title}'{...props} />}
        </>
    )
}`
            
            await write(subFile, subContent);

            const relative = './' + path.relative(genDir, subFile)

            imports += `import ${iconName} from '${fixPath(relative)}'\n`

            body += `\t\tcase ${season.number}:
            selected = <${iconName} {...props} />
            break\n`
        }

        body += `\t}
    return selected
}`
        const content = '// Auto generated \n' + imports + "\n" + body;
        await write(file, content)

        rootIndexImport += "import SeasonIconImport from './SeasonIcon'\n"
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

    function fixPath(string) {
        return string.replaceAll(/\\/g, "/").replace(/\.tsx$/, "")
    }

    function getNameFromFilePath(string) {
        const paths = string.split('/');
        const file = paths[paths.length - 1]
        const name = file.split('.')[0]
        const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
        return capitalized;
    }
}



generate()