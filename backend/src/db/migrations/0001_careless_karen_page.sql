CREATE TABLE `bid` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`auction_id` integer,
	`user_id` integer,
	`amount` real NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE `auctions` ADD `status` text DEFAULT 'OPEN' NOT NULL;--> statement-breakpoint
ALTER TABLE `auctions` ADD `endAt` text;