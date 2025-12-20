-- AlterTable
ALTER TABLE "products" ADD COLUMN     "is_new" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_popular" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "content" (
    "id" SERIAL NOT NULL,
    "section" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_section_key" ON "content"("section");
