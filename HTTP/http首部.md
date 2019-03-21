#### 请求首部字段
客户端往服务器发送报文中所使用的字段,用于补充请求的附加信息，客户端信息，对响应内容相关的优先级等内容
- 1.Accept:text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级,可使用type/subtype这种形式,一次指定多种媒体类型
与首部字段Accept相同的是可用权重q值来表示相对优先级。该首部字段应用于内容协商机制的服务器驱动协商。
文本文件text/html,text/plain,text/css...application/xhtml+xml,application/xml...
图片文件image/jpeg,image/gif,image/png...
视频文件video/mpeg,video/quicktime...
应用程序使用的二进制文件application/octet-stream,application/zip

- 2.Accept-Charset:iso-8859-5,unicode-1-1;q=0.8Accept-Charset
首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。另外，可一次性指定多种字符集。
- 3.Accept-Encoding:gzip,deflate
告知服务器用户代理支持的内容编码及内容编码的优先级顺序
- 4.Accept-Language:zh-cn,zh;q=0.7,en-us,en;q=0.3;
告知服务器用户代理能够处理的自然语言集
- 5.Authorization:BasicdWVub3NlbjpwYXNzd29yZA==
- 6.Ecpect:100-continue
告知服务器期望出现的某种特定行为
- 7.From:
告知服务器使用用户代理的电子邮件地址
- 8.Host:www.hackr.jp
告知服务器，请求的资源所在的互联网主机名和端口号
- 9.If-Match:"123456"
告知服务器匹配资源所用的实体标记(ETag)值
服务器会比对If-Match的字段值和资源的ETag值,仅当两者一致时，才会执行请求,反之，返回412
If-Match:*，这种情况，服务器将会忽略ETag的值,只要资源存在就处理请求
- 10.If-Modified-Since:Thu,15Apr200400:00:00GMT
如果在If-Modified-Since字段指定的日期时间后,资源发生了更新,服务器会接受请求;在指定If-Modified-Since字段值的日期时间之后,如果请求的资源没有过更新,则返回304Not-Modified
If-Modified-Since用于确认代理或客户端拥有的本地资源的有效性。获取资源的更新日期时间，可通过确认首部字段Last-Modified来确定。
- 11.If-None-Match
只有在If-None-Match的字段值与ETag值不一致时，可处理该请求。与If-Match首部字段的作用相反
在GET或HEAD方法中使用首部字段If-None-Match可获取最新的资源。因此，这与使用首部字段If-Modified-Since时有些类似。
- 12.If-Range
它告知服务器若指定的If-Range字段值（ETag值或者时间）和请求资源的ETag值或时间相一致时，则作为范围请求处理。反之，则返回全体资源。
- 13.If-Unmodified-Since:Thu,03Jul201200:00:00GMT
指定的请求资源只有在字段值内指定的日期时间之后，未发生更新的情况下，才能处理请求。如果在指定日期时间后发生了更新，则以状态码412PreconditionFailed作为响应返回。
- 14.Max-Forwards:10
该字段以十进制整数形式指定可经过的服务器最大数目。服务器在往下一个服务器转发请求之前，Max-Forwards的值减1后重新赋值。当服务器接收到Max-Forwards值为0的请求时，则不再进行转发，而是直接返回响应。
- 15.Proxy-Authorization:BasicdGlwOjkpNLAGfFY5
接收到从代理服务器发来的认证质询时，客户端会发送包含首部字段Proxy-Authorization的请求，以告知服务器认证所需要的信息。
- 16.Range:bytes=5001-10000
对于只需获取部分资源的范围请求，包含首部字段Range即可告知服务器资源的指定范围。
- 17.Referer:http://www.hackr.jp/index.htm
首部字段Referer会告知服务器请求的原始资源的URI。
- 18.TE:gzip,deflate;q=0.5
首部字段TE会告知服务器客户端能够处理响应的传输编码方式及相对优先级。它和首部字段Accept-Encoding的功能很相像，但是用于传输编码。
- 19.User-Agent:Mozilla/5.0(WindowsNT6.1;WOW64;rv:13.0)Gecko/20100101Firefox/13.0.1
用于传达浏览器得种类
首部字段User-Agent会将创建请求的浏览器和用户代理名称等信息传达给服务器。
#### 响应首部字段
响应首部字段是由服务器端向客户端返回响应报文中所使用的字段,用于补充响应的附加信息,服务器信息，以及对客户端的附加要求信息
- 1，Accept-Ranges:bytes
- 2，Age:600
- 3,ETag:"82e22293907ce725faf67773957acd12"
告知客户端实体标识,是一种可将资源以字符串形式做唯一性标识的方式，服务器会为每份资源分配对应的ETag
强ETag和弱ETag
- 4,Location:http://www.usagidesign.jp/sample.html
几乎所有的浏览器在接收到包含首部字段Location的响应后，都会强制性地尝试对已提示的重定向资源的访问。
- 5,Proxy-Authenticate:Basicrealm="UsagidesignAuth"
会把由代理服务器所要求认证的认证信息发送给客户端
- 6，Retty-After:120
告知客户端应该在多久之后再次发送请求
- 7,Server:Apache/2.2.17(Unix)
- 8,Vary:Accept-Language
必须从源服务器重新获取字段
- 9，WWW-Authenticate:Basicrealm="UsagidesignAuth"
- 10，首部字段WWW-Authenticate用于HTTP访问认证。

#### 实体首部字段
是包含在请求报头和响应报文中的实体部分所使用的首部,用于补充内容的更新时间等与实体相关的信息
- 1，Allow:GET,HEAD
首部字段Allow用于通知客户端能够支持Request-URI指定资源的所有HTTP方法。当服务器接收到不支持的HTTP方法时，会以状态码405MethodNotAllowed作为响应返回。与此同时，还会把所有能支持的HTTP方法写入首部字段Allow后返回。

- 2,Content-Encoding:gzip
- 3,Content-Language:zh-CN
- 4,Content-Length:15000
- 5,Content-Location:http://www.hackr.jp/index-ja.html

- 6，Content-MD5:OGFkZDUwNGVhNGY3N2MxMDIwZmQ4NTBmY2IyTY==
首部字段Content-MD5是一串由MD5算法生成的值，其目的在于检查报文主体在传输过程中是否保持完整，以及确认传输到达。

- 7,Content-Range:bytes5001-10000/10000
- 8,Content-Type:text/html;charset=UTF-8
- 9,Expires:Wed,04Jul201208:26:05GMT
- 10，Last-Modified:Wed,23May201209:59:
