const { PrismaClient } = require('@prisma/client')

const dtb = new PrismaClient();

async function main() {

    try {
        await dtb.category.createMany({
            data: [
                { name: "Computer Science" },
                { name: "Music" },
                { name: "Fitness" },
                { name: "Photography" },
                { name: "Accounting" },
                { name: "Engineering" },
                { name: "Filming" },
            ],
        });
        console.log("Seeding finished.");

    } catch (error) {
        console.log("Error sending the db categories", error)
    }finally {
        await dtb.$disconnect();
    }

}

main();