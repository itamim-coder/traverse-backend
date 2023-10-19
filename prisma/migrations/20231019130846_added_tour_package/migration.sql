-- CreateTable
CREATE TABLE "TourPackage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "images" TEXT[],
    "starting_date" TEXT NOT NULL,
    "departure" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "available" BOOLEAN NOT NULL,
    "locationId" TEXT NOT NULL,
    "details" TEXT,

    CONSTRAINT "TourPackage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TourPackage" ADD CONSTRAINT "TourPackage_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
