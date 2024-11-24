-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "mode" TEXT NOT NULL DEFAULT 'online';

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0;
