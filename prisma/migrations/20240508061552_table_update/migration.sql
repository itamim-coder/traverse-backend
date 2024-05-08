-- CreateTable
CREATE TABLE "tour" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "images" TEXT[],
    "starting_date" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "details" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT false,
    "upcoming" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tour_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tour" ADD CONSTRAINT "tour_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
