## mysql

## 安装

```sh
brew list
brew install mysql
brew services list
brew services start mysql
brew services stop mysql
mysql -u root -p 输入密码

brew list |grep mysql
show databases; 
use 库名  
show tables; 
desc 表名; 
select * from 表名;
quit 退出
```
## 常用 sql
- 创建数据库
```sh
create database 库名
create database if not exists 库名
```
- 添加字符集
```sh
create database `user`
    default character set = 'utf8mb4';
```
- 创建表
```sh
CREATE TABLE `user` (
   id int NOT NULL AUTO_INCREMENT PRIMARY KEY, # id: 数字 非空 自增 主键
   name varchar(100) COMMENT '名字',
   age int COMMENT '年龄',
   address varchar(255) COMMENT '地址',
   create_time timestamp DEFAULT CURRENT_TIMESTAMP  COMMENT '创建时间'
) COMMENT '用户表'
```
- 修改表名
```sh
ALTER TABLE `user` RENAME `user2`;
```
- 增加列
```sh
ALTER TABLE `user` Add COLUMN `hobby` VARCHAR(200);
```
- 删除列
```sh
ALTER TABLE `user` DROP COLUMN `hobby`;
```
- 编辑列
```sh
ALTER TABLE `user` MODIFY COLUMN `age` VARCHAR(255) NULL COMMENT '年龄2';
```
## 查询
```sh
# 查询所有列
SELECT *  FROM `user`; 
# 查询单列
SELECT `name` FROM `user`; 
# 查询多列，逗号隔开
SELECT `name`,`id` FROM `user`; 
# 别名 as
SELECT `name` as `user_name`,`id` as `user_id` FROM `user`; 
# 排序 desc 降序 asc 升序
SELECT *  FROM `user` ORDER BY id DESC; 
# 限制查询结果(limit [开始行] [限制条数])
SELECT *  FROM `user` LIMIT 1,3 
 # 条件查询
SELECT *  FROM `user` WHERE name = "strive";
# 联合查询 and
SELECT * FROM `user` WHERE name = 'strive' AND age <= 30; 
# or
SELECT * FROM `user` WHERE name = 'strive' OR age <= 30; 
# 模糊查询
# 匹配包含"strive"的任意位置的字符串，前后可以是任意字符。
SELECT * FROM `user` WHERE name LIKE '%strive%'; 
# 匹配以"strive"开头的字符串，后面可以是任意字符。
strive%
# 匹配以"strive"结尾的字符串，前面可以是任意字符。
%strive
```
## 新增
```sh
INSERT INTO user(`name`,`address`,`age`) VALUES('strive', 'shandong', 30)
# 插入 null
INSERT INTO user(`name`,`address`,`age`) VALUES(NULL,NULL,NULL)
# 插入多条数据 逗号隔开
INSERT INTO user(`name`,`address`,`age`) VALUES(NULL,NULL,NULL),('strive', 'shandong', 30)
```
## 删除
```sh
# 删除id为1
DELETE FROM `user` WHERE id = 1; 
# 批量删除
DELETE FROM `user` WHERE id IN (1,2,3);
```
## 更新
> 更新的字段使用=赋值, where确定更新的条例
```sh
UPDATE `user` SET name='strive',age=30,address='shandong' WHERE id = 1;
```
## 表达式
```sh
SELECT age + 100  FROM `user`;
# 更换列名
SELECT age + 100 as age FROM `user`;
```
## 函数
```sh
# 返回随机数
SELECT RAND()  FROM `user`;
# 求和
SELECT SUM(`age`)  FROM `user`;
# 字符串拼接
SELECT CONCAT(`name`,'最棒')  FROM `user`;
# 获取总数
select COUNT(*) from `user`
```
## 子查询
> 子查询（Subquery），也被称为嵌套查询（Nested Query），是指在一个查询语句中嵌套使用另一个完整的查询语句。
```sh
# 比如有如下关联关系: user表的id 关联 photo表的user_id，现在需要通过名字查询出photo表的数据 但是photo表没有存名字怎么弄
SELECT * FROM `photo` WHERE `user_id` = (SELECT id FROM `user` WHERE name = 'strive')
```
## 连表
- 内连接
```sh
SELECT * FROM `user`, `photo` WHERE `user`.`id` = `photo`.`user_id`
```
- 外连接
> 左连接: 语法规则 LEFT JOIN [连接的表] ON [连接的条件]

以第一个表作为驱动表 被驱动表如果没有值则补充null
```sh
SELECT * FROM `user` LEFT JOIN `table` ON `user`.`id` = `table`.`user_id`
```
> 右连接: 语法规则 RIGHT JOIN [连接的表] ON [连接的条件]

以第二个表作为驱动表 被驱动表如果没有值则忽略
```sh
SELECT * FROM `user` RIGHT JOIN `table` ON `user`.`id` = `table`.`user_id`
```
