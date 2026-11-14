/*
  Warnings:

  - You are about to drop the column `idUser` on the `Item` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_idUser_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "idUser",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
