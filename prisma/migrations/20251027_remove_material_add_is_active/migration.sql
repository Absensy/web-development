-- AlterTable
ALTER TABLE "examples_our_work" DROP COLUMN "material";

-- AlterTable
ALTER TABLE "examples_our_work" ADD COLUMN "is_active" BOOLEAN NOT NULL DEFAULT true;
