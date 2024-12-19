/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `service` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "service_name_key" ON "service"("name");
