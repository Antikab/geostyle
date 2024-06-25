-- CreateTable
CREATE TABLE "geo_styles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "code" TEXT NOT NULL,
    "image" VARCHAR(1024) NOT NULL,
    "thumbnail" VARCHAR(1024) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "geo_styles_id_key" ON "geo_styles"("id");
