-- DropForeignKey
ALTER TABLE `recipe` DROP FOREIGN KEY `Recipe_categoryId_fkey`;

-- DropIndex
DROP INDEX `Recipe_categoryId_fkey` ON `recipe`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `stockMin` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `recipe` MODIFY `categoryId` INTEGER NULL,
    MODIFY `validity` VARCHAR(191) NULL,
    MODIFY `yield` DOUBLE NULL,
    MODIFY `wastePercentage` DOUBLE NULL DEFAULT 0,
    MODIFY `markup` DOUBLE NULL DEFAULT 1,
    MODIFY `costTotal` DOUBLE NULL DEFAULT 0,
    MODIFY `costWithWaste` DOUBLE NULL DEFAULT 0,
    MODIFY `suggestedPrice` DOUBLE NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
