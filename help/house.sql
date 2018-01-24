-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2018-01-24 07:47:08
-- 服务器版本： 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `house`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `account` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `account`, `password`, `name`) VALUES
(1, 'admin', '123', '管理员');

-- --------------------------------------------------------

--
-- 表的结构 `house`
--

CREATE TABLE `house` (
  `id` int(10) NOT NULL,
  `type` int(10) NOT NULL,
  `jieshao` varchar(1000) CHARACTER SET utf8 NOT NULL,
  `diduan` varchar(50) CHARACTER SET utf8 NOT NULL,
  `huxing` varchar(50) CHARACTER SET utf32 NOT NULL,
  `price` varchar(50) CHARACTER SET utf8 NOT NULL,
  `zuzhutype` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `chaoxiang` varchar(20) CHARACTER SET utf8 NOT NULL,
  `mianji` varchar(20) CHARACTER SET utf8 NOT NULL,
  `userid` int(10) NOT NULL,
  `shenhe` int(10) NOT NULL,
  `youkeid` int(10) DEFAULT NULL,
  `hasimg` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `house`
--

INSERT INTO `house` (`id`, `type`, `jieshao`, `diduan`, `huxing`, `price`, `zuzhutype`, `chaoxiang`, `mianji`, `userid`, `shenhe`, `youkeid`, `hasimg`) VALUES
(13, 1, '13测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍', '城乡结合部', '平层户型', '1400000', NULL, '东', '100', 1, 1, 1, 1),
(14, 0, '14测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍测试介绍', '城乡结合部', '跃层户型', '2000', '合租', '南', '60', 1, 1, 1, 1),
(16, 1, '到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放到晚发放', '次繁华生活区', '错层户型', '4000000', NULL, '南', '100', 1, 1, NULL, 1),
(20, 0, '1111111111111', '闹市中心区', '平层户型', '2000', '整租', '东', '80', 1, 1, NULL, 1),
(21, 0, '22222222', '闹市中心区', '平层户型', '400', '整租', '东', '30', 1, 1, NULL, 1),
(22, 0, '333333333333333', '闹市中心区', '平层户型', '3333', '整租', '东', '200', 1, 1, NULL, 1),
(23, 0, '444444444444444', '闹市中心区', '平层户型', '4444', '整租', '东', '60', 1, 1, NULL, 1),
(24, 0, '55555555555', '闹市中心区', '平层户型', '555', '整租', '东', '30', 1, 1, NULL, 1),
(25, 1, '出售测试333333333333', '闹市中心区', '平层户型', '3333', NULL, '东', '32', 1, 1, NULL, 1),
(26, 1, '出售测试44444444444444', '闹市中心区', '平层户型', '4443', NULL, '东', '99', 1, 1, NULL, 1),
(27, 1, '出售测试5555555555', '闹市中心区', '平层户型', '555', NULL, '东', '55', 1, 1, NULL, 1),
(28, 1, 'dwadaw', '闹市中心区', '平层户型', '6000000', NULL, '东', '120', 1, 1, NULL, 1);

-- --------------------------------------------------------

--
-- 表的结构 `houseimg`
--

CREATE TABLE `houseimg` (
  `id` int(10) NOT NULL,
  `houseid` int(10) NOT NULL,
  `url` varchar(100) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `houseimg`
--

INSERT INTO `houseimg` (`id`, `houseid`, `url`) VALUES
(12, 13, '/uploads/1/13-0-219049-12100615453688.jpg'),
(13, 13, '/uploads/1/13-1-6407395_090601814000_2.jpg'),
(14, 13, '/uploads/1/13-2-0040039459937143_b.jpg'),
(15, 13, '/uploads/1/13-3-g0_8473350.jpg'),
(16, 14, '/uploads/1/14-0-1857-111024120R58.jpg'),
(17, 14, '/uploads/1/14-1-219049-12100615453688.jpg'),
(18, 14, '/uploads/1/14-2-6407395_090601814000_2.jpg'),
(19, 14, '/uploads/1/14-3-01300001227557130562200054246.jpg'),
(20, 16, '/uploads/1/16-0-1857-11102411411874.jpg'),
(21, 16, '/uploads/1/16-1-1857-11102411450590.jpg'),
(22, 16, '/uploads/1/16-2-219049-12100615453688.jpg'),
(23, 16, '/uploads/1/16-3-6407395_090601814000_2.jpg'),
(24, 16, '/uploads/1/16-4-0040039459937143_b.jpg'),
(34, 20, '/uploads/1/20-0-56b861f094a61.jpg_600.jpg'),
(35, 20, '/uploads/1/20-1-106-16101QJA3204.jpg'),
(36, 20, '/uploads/1/20-2-1857-111024113K895.jpg'),
(37, 20, '/uploads/1/20-3-1857-11102412211828.jpg'),
(38, 20, '/uploads/1/20-4-219049-12100615453688.jpg'),
(39, 20, '/uploads/1/20-5-6407395_090601814000_2.jpg'),
(40, 21, '/uploads/1/21-0-01300001227557130562200054246.jpg'),
(41, 22, '/uploads/1/22-0-6407395_090601814000_2.jpg'),
(42, 22, '/uploads/1/22-1-1346228224284.jpg'),
(43, 23, '/uploads/1/23-0-1857-11102412211828.jpg'),
(44, 23, '/uploads/1/23-1-219049-12100615453688.jpg'),
(45, 23, '/uploads/1/23-2-6407395_090601814000_2.jpg'),
(46, 24, '/uploads/1/24-0-1857-111024113K895.jpg'),
(47, 24, '/uploads/1/24-1-1857-111024120R58.jpg'),
(48, 25, '/uploads/1/25-1-106-16101QJA3204.jpg'),
(49, 25, '/uploads/1/25-0-56b861f094a61.jpg_600.jpg'),
(50, 26, '/uploads/1/26-0-1857-11102412211828.jpg'),
(51, 26, '/uploads/1/26-1-g0_8473350.jpg'),
(52, 27, '/uploads/1/27-0-219049-12100615453688.jpg'),
(53, 27, '/uploads/1/27-1-6407395_090601814000_2.jpg'),
(54, 28, '/uploads/1/28-0-106-16101QJA3204.jpg'),
(55, 28, '/uploads/1/28-1-1857-111024113K895.jpg'),
(56, 28, '/uploads/1/28-2-1346228224284.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `account` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `account`, `password`, `name`, `phone`) VALUES
(1, 'mht', '202cb962ac59075b964b07152d234b70', '马化腾', '123456789');

-- --------------------------------------------------------

--
-- 表的结构 `visitor`
--

CREATE TABLE `visitor` (
  `id` int(10) NOT NULL,
  `account` varchar(100) CHARACTER SET utf8 NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8 NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `visitor`
--

INSERT INTO `visitor` (`id`, `account`, `password`, `name`, `phone`) VALUES
(1, 'yk1', '202cb962ac59075b964b07152d234b70', '游客1', '110');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `house`
--
ALTER TABLE `house`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `houseimg`
--
ALTER TABLE `houseimg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visitor`
--
ALTER TABLE `visitor`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `house`
--
ALTER TABLE `house`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- 使用表AUTO_INCREMENT `houseimg`
--
ALTER TABLE `houseimg`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `visitor`
--
ALTER TABLE `visitor`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
