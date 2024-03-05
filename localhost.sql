-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- 생성 시간: 24-03-05 14:44
-- 서버 버전: 8.0.36
-- PHP 버전: 8.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `account`
--
CREATE DATABASE IF NOT EXISTS `account` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `account`;

-- --------------------------------------------------------

--
-- 테이블 구조 `comment`
--

CREATE TABLE `comment` (
  `comment_id` int NOT NULL,
  `post_id` int DEFAULT NULL,
  `comment_name` varchar(255) DEFAULT NULL,
  `content` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `comment`
--

INSERT INTO `comment` (`comment_id`, `post_id`, `comment_name`, `content`, `created_at`, `updated_at`) VALUES
(34, 50, 'naimnaro', '외래키 사용이 필수적은 아닙니다.', '2024-03-02 14:41:21', '2024-03-02 14:41:21'),
(36, 49, 'naimnaro', '게시글의 인덱스를 댓글의 인덱스테이블에 넘겨야합니다', '2024-03-02 14:42:28', '2024-03-02 14:42:28'),
(37, 52, 'test2', 'comment_test ', '2024-03-02 14:43:50', '2024-03-02 14:43:50'),
(38, 50, 'test2', '네 ', '2024-03-02 14:43:58', '2024-03-02 14:43:58'),
(39, 49, 'test2', 'ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅇㄴㅁ', '2024-03-02 14:44:16', '2024-03-02 14:44:16'),
(40, 52, 'test2', '동혁이는 미남이다\n', '2024-03-02 14:46:07', '2024-03-02 14:46:07'),
(41, 52, 'hawawa', 'asdsd??', '2024-03-04 11:44:51', '2024-03-04 11:44:51'),
(42, 52, 'hawawa', 'asd', '2024-03-04 11:53:16', '2024-03-04 11:53:16'),
(43, 51, 'hawawa', '작성 해봐 ', '2024-03-04 12:15:34', '2024-03-04 12:15:34'),
(44, 50, 'hawawa', 'ㄴㅇㄴㅁ', '2024-03-04 12:27:58', '2024-03-04 12:27:58'),
(45, 50, 'hawawa', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', '2024-03-04 12:28:04', '2024-03-04 12:28:04'),
(46, 52, 'hawawa', 'ㅁㄴㅇㅁㄴㅇㅇ', '2024-03-04 12:28:15', '2024-03-04 12:28:15'),
(47, 52, 'hawawa', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', '2024-03-04 12:28:19', '2024-03-04 12:28:19'),
(48, 51, 'hawawa', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', '2024-03-04 12:30:07', '2024-03-04 12:30:07'),
(49, 51, 'hawawa', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', '2024-03-04 12:30:15', '2024-03-04 12:30:15'),
(50, 52, 'hawawa', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', '2024-03-04 12:33:31', '2024-03-04 12:33:31'),
(51, 52, 'test', 'ㅇㅇㄴㅇ', '2024-03-04 12:35:58', '2024-03-04 12:35:58'),
(52, 52, 'test', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', '2024-03-04 12:36:37', '2024-03-04 12:36:37'),
(53, 52, 'test', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ', '2024-03-04 12:42:28', '2024-03-04 12:42:28'),
(54, 52, 'test', 'ㅁㄴㅇ', '2024-03-04 12:49:32', '2024-03-04 12:49:32'),
(62, 52, 'naimnaro', 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ\n', '2024-03-05 12:05:35', '2024-03-05 12:05:35'),
(67, 52, 'naimnaro', '하와와와와와와와', '2024-03-05 13:58:01', '2024-03-05 13:58:01'),
(68, 51, 'naimnaro', '하와와', '2024-03-05 14:10:20', '2024-03-05 14:10:20'),
(69, 55, 'awawa', '네다씹 ', '2024-03-05 14:11:23', '2024-03-05 14:11:23'),
(70, 55, 'awawa', '메평', '2024-03-05 14:11:29', '2024-03-05 14:11:29'),
(71, 55, 'hawawa', '??', '2024-03-05 14:12:45', '2024-03-05 14:12:45'),
(81, 55, '이중표', '말넘심', '2024-03-05 14:20:23', '2024-03-05 14:20:23');

-- --------------------------------------------------------

--
-- 테이블 구조 `post`
--

CREATE TABLE `post` (
  `post_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `views` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `post`
--

INSERT INTO `post` (`post_id`, `title`, `content`, `author_name`, `created_at`, `updated_at`, `views`) VALUES
(6, '하와와', '하와와와와와~~~~~', 'awawa', '2024-02-27 11:22:37', '2024-03-05 13:45:06', 1),
(7, '하와와와~~~', 'ㅁㄴㅇㅁㄴㅇㄴㅁㅇㅁㄴㅇㅁㅇㄴㅁㅇㄴㅇㅁㄴ', 'hawawa', '2024-02-27 12:25:46', '2024-02-27 12:25:46', 0),
(9, '글 제목_test', '글 내용_test 글 내용_test 글 내용_test 글 내용_test 글 내용_test 글 내용_test', '이중표', '2024-02-27 12:41:04', '2024-02-27 12:41:04', 0),
(10, '글 작성 테스트 ', '글 내용  글 내용  글 내용 글 내용 글 내용 글 내용 글 내용 ', '이중표2', '2024-02-27 12:45:42', '2024-02-27 12:45:42', 0),
(36, '오오오옹', '', 'awawa', '2024-03-01 11:28:37', '2024-03-01 11:28:37', 0),
(37, 'ㅇ', 'ㅇ', 'awawa', '2024-03-01 11:35:29', '2024-03-05 13:58:36', 9),
(48, 'testing ', 'testing  testing  testing  testing  testing ', 'test', '2024-03-02 14:37:43', '2024-03-05 13:58:40', 4),
(49, '게시글과 댓글 테이블 구성을 어케해야하나요 ? ', '게시글과 댓글 테이블 구성을 어케해야하나요 ?  \n게시글과 댓글 테이블 구성을 어케해야하나요 ? \n게시글과 댓글 테이블 구성을 어케해야하나요 ? \n게시글과 댓글 테이블 구성을 어케해야하나요 ? ', 'test', '2024-03-02 14:38:27', '2024-03-05 13:36:19', 4),
(50, '외래키 사용없이 만들어도되나요 ? ', '외래키 사용없이 만들어도되나요 ? \n외래키 사용없이 만들어도되나요 ? \n외래키 사용없이 만들어도되나요 ? \n외래키 사용없이 만들어도되나요 ? \n외래키 사용없이 만들어도되나요 ? ', '이중표', '2024-03-02 14:39:02', '2024-03-05 14:17:33', 20),
(51, '하와와와', '하와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와', 'naimnaro', '2024-03-02 14:39:25', '2024-03-05 14:10:15', 4),
(52, '하와와와와와와와', '하와와와와와와와 하와와와와와와와 하와와와와와와와 하와와와와와와와 하와와와와와와와 하와와와와와와와 하와와와와asdsad와와와 하와와와와와와와 하와와와와와와와', 'naimnaro', '2024-03-02 14:39:34', '2024-03-05 14:20:26', 95),
(55, '후루베 유라유라', '유라유라~', '이중표', '2024-03-05 14:10:54', '2024-03-05 14:20:16', 25),
(56, '“허식 「자」무라사키 (虚式 「茈」)', '사토루 사토루~', 'hawawa', '2024-03-05 14:14:27', '2024-03-05 14:19:12', 3);

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'naimnaro', 'xez8jf@gmail.com', 'dlwndvy123@'),
(2, 'babo', 'dlwndvy123@naver.com', 'dlwndvy123@'),
(3, 'hawawa', 'hawawa@gmail.com', 'dlwndvy123@'),
(4, 'awawa', 'awawa@gmail.com', 'dlwndvy123@'),
(5, 'ljp', 'ljp@gmail.com', 'dlwndvy123@'),
(6, 'reunomi', 'reunomi@gmail.com', 'dlwndvy123@'),
(11, 'reunomi2', 'reunomi2@gmail.com', 'dlwndvy123@'),
(12, 'wow', 'wow@gmail.com', 'dlwndvy123@'),
(14, '이중표', 'dlwndvy@gmail.com', 'dlwndvy123@'),
(15, '이중표2', 'dlwndvy2@gmail.com', 'dlwndvy123@'),
(16, '이중표3', 'dlwndvy3@gmail.com', 'dlwndvy123@'),
(17, 'leejungpyo', 'leejungpyo@gmail.com', 'dlwndvy123@'),
(19, 'test', 'test@gmail.com', 'dlwndvy123@'),
(20, '이중표4', 'dlwndvy4@naver.com', 'dlwndvy123@'),
(21, '이동혁', 'dong@naver.com', 'dlwndvy123@'),
(22, 'test2', 'test2@gmail.com', 'dlwndvy123@');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `comment_ibfk_2` (`comment_name`);

--
-- 테이블의 인덱스 `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `idx_author_name` (`author_name`);

--
-- 테이블의 인덱스 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- 테이블의 AUTO_INCREMENT `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
