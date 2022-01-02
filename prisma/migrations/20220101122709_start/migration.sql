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
