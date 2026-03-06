const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const setting = await prisma.setting.upsert({
        where: { key: 'socialWhatsapp' },
        update: { value: '+33 6 12 34 56 78' },
        create: { key: 'socialWhatsapp', value: '+33 6 12 34 56 78' }
    });
    console.log("Updated WhatsApp number", setting);
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
