CREATE DATABASE project_manager;

CREATE TABLE user (
    user_idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userid VARCHAR(50) NOT NULL,
    auth VARCHAR(6) NOT NULL,
    registration_date TIMESTAMP NOT NULL
)

CREATE TABLE post (
    post_idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    writer VARCHAR(50) NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    contents TEXT NOT NULL,
    opinion TEXT,
    post_date TIMESTAMP NOT NULL
)

CREATE TABLE post_attach(
    attach_idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    post_idx INT NOT NULL,
    path TEXT
)

CREATE TABLE post_comment(
    comment_idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    post_idx INT NOT NULL,
    writer VARCHAR(50) NOT NULL,
    comment_date TIMESTAMP NOT NULL,
    comment_content TEXT NOT NULL
)

CREATE TABLE comment_reply(
    reply_idx INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    comment_idx INT NOT NULL,
    writer VARCHAR(50) NOT NULL,
    reply_date TIMESTAMP NOT NULL,
    reply_content TEXT NOT NULL
)