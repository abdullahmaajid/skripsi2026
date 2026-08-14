import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
async function main() {
  const m = await prisma.major.findUnique({ where: { id: "cmqaropl90022bxx7iyga99iq" } })
  console.log("Found:", m)
}
main()
