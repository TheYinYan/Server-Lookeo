-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "season" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUser" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
