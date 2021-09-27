-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,
    `admin` BOOLEAN NOT NULL DEFAULT false,
    `password_reset_token` VARCHAR(255),
    `password_reset_expires` DATETIME(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
