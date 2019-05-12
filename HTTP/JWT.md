## JWT
JSON Web Token(JWT)是目前最流行的跨域认证解决方法

## 跨域认证问题
一般流程
- 1.用户向服务器发送用户名和密码
- 2.服务器验证通过后,在当前对话(session)里面保存相关数据,比如用户角色, 登陆时间等;
- 3.服务器向用户返回一个`session_id`, 写入用户的`cookie`
- 4.用户随后的每一次请求, 都会通过`cookie`, 将`session_id`传回服务器
- 5.服务端收到 `session_id`, 找到前期保存的数据, 由此得知用户的身份 

### 有什么问题呢?


## JWT原理
服务器认证以后,生成一个JSON对象,发送给用户,就像下面这样
```js
{
  "姓名": "张三",
  "角色": "管理员",
  "到期时间": "2018年7月1日0点0分"
}
```
以后,用户与服务器通信, 都要发回这个JSON对象,服务器完全只靠这个对象认定用户身份.为了防止用户篡改数据,服务器生成对象的时候,会加上签名
服务器就不保存任何 session 数据,也就是是说, 服务器变成无状态的了, 从而比较容易实现扩展
## JWT数据结构
xxxxx.yyyyy.zzzzz
header(头部) + payLoad(负载) + signature(签名)
### header
是一个JSON对象, 保存JWT的元数据

```js
{
  "alg": "HS256", // 签名的算法
  "typ": "JWT" // 表示这个令牌(token)的类型(type), JWT的类型为'JWT'
}
```

### payLoad
也是一个JSON对象,用来存放实际需要传递的数据
iss (issuer)：签发人
exp (expiration time)：过期时间
sub (subject)：主题
aud (audience)：受众
nbf (Not Before)：生效时间
iat (Issued At)：签发时间
jti (JWT ID)：编号

还可以定义一些私有字段
```js
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```
注意, JWT默认是不加密的,任何人都可以读到, 所以不要把秘密信息放在这个部分
这个 JSON 对象也要使用 Base64URL 算法转成字符串。

### signature
签名, 为了防止数据被篡改
```js
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```
算出签名以后，把 Header、Payload、Signature 三个部分拼成一个字符串，每个部分之间用"点"（.）分隔，就可以返回给用户。
## 使用方式
客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。
此后，客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求的头信息Authorization字段里面。

```js
Authorization: Bearer <token>
```
另一种做法是，跨域的时候，JWT 就放在 POST 请求的数据体里面。
## 特点
- 1.JWT默认是不加密的, 但也是可以加密的.生成原始token以后, 可以再用密钥再加密一次
- 2.JWT不加密的情况下,不能将秘密数据写入JWT
- 3.JWT不仅用于认证,也可以用于交换信息.有效使用JWT,可以降低服务器查询数据库的次数
- 4.JWT的最大缺点是, 由于服务器不保存session状态, 因此无法在使用过程中废止某个token,或者更改token的权限,也就是说,一旦JWT签发了,在到期之前就会始终有效,除非服务器部署额外逻辑
- 5.JWT本身包含了认证信息, 一旦泄露,任何人都可以获得该令牌的所有权限.为了减少盗用, JWT的有效期应该设置得比较短.对于一些比较重要的权限,使用时应该再次对用户进行认证
- 6.为了减少盗用,JWT不应该使用HTTP协议明码传输,要使用HTTPS协议传输

## JWT优缺点

## 例子

## 适用场景
1.一次性验证
比如用户注册后需要发一封邮件让其激活账户，通常邮件中需要有一个链接，这个链接需要具备以下的特性：能够标识用户，该链接具有时效性（通常只允许几小时之内激活），不能被篡改以激活其他可能的账户…这种场景就和 jwt 的特性非常贴近，jwt 的 payload 中固定的参数：iss 签发者和 exp 过期时间正是为其做准备的。

2.restful api的无状态认证
使用 jwt 来做 restful api 的身份认证也是值得推崇的一种使用方案。客户端和服务端共享 secret；过期时间由服务端校验，客户端定时刷新；签名信息不可被修改…spring security oauth jwt 提供了一套完整的 jwt 认证体系，以笔者的经验来看：使用 oauth2 或 jwt 来做 restful api 的认证都没有大问题，oauth2 功能更多，支持的场景更丰富，后者实现简单。

3.使用 jwt 做单点登录+会话管理(不推荐)
## 参考
- [jwt.io](https://jwt.io/introduction/)
- [JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)
- [理解JWT的使用场景和优劣](http://blog.didispace.com/learn-how-to-use-jwt-xjf/)
https://www.zhihu.com/question/36135526


