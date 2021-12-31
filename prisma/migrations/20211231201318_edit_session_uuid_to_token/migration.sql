/*
  Warnings:

  - The primary key for the `session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `uuid` on the `session` table. All the data in the column will be lost.
  - The required column `token` was added to the `Session` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `Comments_postId_fkey` ON `comments`;

-- DropIndex
DROP INDEX `PostCategory_categoryId_fkey` ON `postcategory`;

-- DropIndex
DROP INDEX `PostCategory_postId_fkey` ON `postcategory`;

-- DropIndex
DROP INDEX `Posts_authorId_fkey` ON `posts`;

-- DropIndex
DROP INDEX `Session_uid_fkey` ON `session`;

-- AlterTable
ALTER TABLE `session` DROP PRIMARY KEY,
    DROP COLUMN `uuid`,
    ADD COLUMN `token` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`token`);

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostCategory` ADD CONSTRAINT `PostCategory_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PostCategory` ADD CONSTRAINT `PostCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
