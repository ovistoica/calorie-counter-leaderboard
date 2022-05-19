import type { CalorieLog, User } from '@prisma/client'

import { prisma } from '~/db.server'

export type { CalorieLog } from '@prisma/client'

export function getLog({ id, userId }: Pick<CalorieLog, "id"> & {
  userId: User["id"]
}) {
  return prisma.calorieLog.findFirst({
    where: { id, userId }
  });
}

export function getCalorieLogItems({ userId }: { userId: User["id"] }) {
  return prisma.calorieLog.findMany({
    where: { userId },
    select: { id: true, comment: true, date: true },
    orderBy: { updatedAt: "desc" }
  });
}

export function createLog({ userId }: Pick<CalorieLog, ''> & {
  userId: User["id"]
}) {
  return prisma.calorieLog.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId
        }
      }
    }
  });
}

export function deleteCalorieLog({ id, userId }: Pick<CalorieLog, "id"> & { userId: User["id"] }) {
  return prisma.calorieLog.deleteMany({
    where: { id, userId }
  });
}
