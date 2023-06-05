drop table if exists diary;
drop table if exists member;

create table member (
    `member_id` bigint not null auto_increment primary key,
    `email` varchar(128) collate utf8_general_ci not null,
    `name` varchar(128) collate utf8mb4_bin not null,
    `password` varchar(255) collate utf8mb4_bin not null
);

create table diary (
    `diary_no` varchar(255) not null primary key,
    `author_id` bigint not null,
    `content` text not null,
    `emoji` tinyint not null default 3,
    `wrote_date` date not null,
    `image` varchar(200),
    foreign key (`author_id`) references member (`member_id`)
);
