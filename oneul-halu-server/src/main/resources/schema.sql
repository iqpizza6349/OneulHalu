drop table if exists diary;
drop table if exists member;

create table member (
    `member_id` bigint not null auto_increment primary key,
    `name` varchar(128) collate utf8mb4_bin not null,
    `password` varchar(255) collate utf8mb4_bin not null
);

create table diary (
    `diary_no` varchar(255) not null primary key,
    `author_id` bigint not null,
    `title` varchar(128) not null,
    `content` text not null,
    `emoji` tinyint not null default 3,
    `wrote_date` date not null,
    foreign key (`author_id`) references member (`member_id`)
);
