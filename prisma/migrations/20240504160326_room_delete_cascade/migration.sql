-- DropForeignKey
ALTER TABLE "RoomNumber" DROP CONSTRAINT "RoomNumber_roomId_fkey";

-- AddForeignKey
ALTER TABLE "RoomNumber" ADD CONSTRAINT "RoomNumber_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
