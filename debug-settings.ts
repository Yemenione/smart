import { prisma } from './lib/prisma.js'

async function main() {
    const settings = await prisma.setting.findMany()
    console.log('--- SITE SETTINGS ---')
    console.log(JSON.stringify(settings, null, 2))
    console.log('---------------------')
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
