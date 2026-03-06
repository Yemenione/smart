import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const settings = await prisma.setting.findMany()
    console.log('--- SITE SETTINGS ---')
    console.log(JSON.stringify(settings, null, 2))
    console.log('---------------------')
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect())
