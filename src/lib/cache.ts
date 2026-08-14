import { prisma } from "@/lib/prisma"
import { unstable_cache } from "next/cache"

/**
 * Fetch all subjects and chapters from the database.
 * This data rarely changes, so it's cached indefinitely on the server.
 * Cache is revalidated when the app restarts or manually if tags are used.
 */
export const getCachedSyllabus = unstable_cache(
  async () => {
    const subjects = await prisma.subject.findMany({
      include: {
        chapters: {
          orderBy: { order: "asc" }
        }
      },
      orderBy: { name: "asc" }
    })
    return subjects
  },
  ["syllabus-data"],
  {
    revalidate: 86400, // Revalidate every 24 hours just in case
    tags: ["syllabus"]
  }
)
