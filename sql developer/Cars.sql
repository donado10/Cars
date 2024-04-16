use CarCollectionsAPI;

desc collections;

select * from collections;

desc cars;

select * from cars;

delete from cars where id=9;

insert into cars(model,year,image,price,description,userId,CollectionId) Values('ado',1997,'hey there',50000,'Whatssup homie',1,38);

SELECT `cars`.`id`, `cars`.`model`, `cars`.`year`, `cars`.`image`, `cars`.`price`, `cars`.`description`, `cars`.`userId`, `cars`.`CollectionId`, `collection`.`id` AS `collection.id`, `collection`.`name` AS `collection.name`, `collection`.`logo` AS `collection.logo`, `collection`.`description` AS `collection.description`, `collection`.`userId` AS `collection.userId` FROM `cars` AS `cars` INNER JOIN `collections` AS `collection` ON `cars`.`CollectionId` = `collection`.`id` AND `collection`.`id` = 38 WHERE `cars`.`id` = 1;

SELECT `id`, `model`, `year`, `image`, `price`, `description`, `userId`, `CollectionId` FROM `cars` AS `cars` WHERE `cars`.`userId` = 1 AND `cars`.`id` = 2; 