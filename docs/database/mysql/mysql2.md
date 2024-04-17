## mysql2

安装依赖
```sh
# mysql2 用来连接 mysql 和编写 sql 语句
# express 用来提供接口(增删改查)
# js-yaml 用来编写配置文件
npm install mysql2 express js-yaml
```
配置文件
```sh
# 新建 db.config.yaml
db:
   host: localhost # 主机
   port: 3306 # 端口
   user: root # 账号
   password: '' # 密码(一定要字符串)
   database: user # 库名
```
index.js
```js
import mysql2 from 'mysql2/promise' // 支持 promise
import fs from 'node:fs'
import jsyaml from 'js-yaml'
import express from 'express'

const yaml = fs.readFileSync('./db.config.yaml', 'utf8')
const config = jsyaml.load(yaml) // 字符串转为对象
const sql = await mysql2.createConnection({
   ...config.db
})
const app = express()
app.use(express.json()) // 处理 post 参数

// 查询所有
app.get('/',async (req,res)=>{
   const [data] = await sql.query('select * from user')
   res.send(data)
})

// 单个查询
app.get('/user/:id',async (req,res)=>{
    const [row] = await sql.query(`select * from user where id = ?`,[req.params.id])
    res.send(row)
})

// 创建
app.post('/create',async (req,res)=>{
    const {name, age, address} = req.body
    await sql.query(`insert into user(name,age,address) values(?,?,?)`,[name,age,address])
    res.send({ok:1})
})

// 更新
app.post('/update',async (req,res)=>{
    const {name, age, address, id} = req.body
    await sql.query(`update user set name = ?,age = ?,address = ? where id = ?`,[name,age,address,id])
    res.send({ok:1})
})
// 删除
app.post('/delete',async (req,res)=>{
    await sql.query(`delete from user where id = ?`,[req.body.id])
    res.send({ok:1})
})

app.listen(port, () => {
   console.log('Example app listening on port 3000')
})
```
