
__filename: 获取当前模块的带有完整绝对路径的文件名
__dirname: 获取当前模块文件是所在目录的完整绝对路径
# 1.buffer(Buffer类)
Buffer为将应用程序中的二进制数据的存储与转换提供一个缓存区

toString(): 将缓存区中内容转换为字符串
```js
const data = new Buffer('我喜爱编程');
data.toString();
```
new Buffer();
isBuffer();
Buffer.concat([str1, str2], 6);

# 2.event()

# 3.file(fs模块)

## 同步VS异步
readFile, readFileSync ,带有sync的是同步方法,否则为异步方法,两者区别: 同步方法立即返回操作结果,在使用同步方法执行的操作结束之前,不能执行后续代码
```js
var fs = require('fs');
var data = fs.readFileSync('./index.html', 'utf8');
// console.log(data);
fs.readFile('./index.html', 'utf8', (err, data) => {
    // 操作结果作为回调函数的第二个参数返回
    console.log(data);
})
```
大多数情况使用异步;特殊场景(例如读取文件配置并启动服务器,),应该使用同步方法


## 对文件完成读写
### 读文件
异步
```js
fs.readFile(filename, [options], callback);
```
filename: 必填,指定读取文件的完整文件路径及文件名
options: 可选,是一个对象, 
- flag属性指定对改文件采取什么操作,
  默认值为'r'(如果指定读取的文件不存在,则抛出异常);
  'r+': 读取并写入文件,如果文件不存在则抛出异常
  'rs': 以同步方式读取文件并通知操作系统忽略文件系统缓存,文件不存在则创建文件
  'w': 写入文件,文件不存在则创建改文件,问津已存在则清空文件内容
  'wx': 作用与'w'类似，但是以排他方式写入文件
  'w+': 读取并写入该文件，如果文件不存在则创建文件，如果存在则清空文件内容
  'a': 追加写入文件,文件不存在则创建文件
  'a+':读取并追加写入文件，如果不存在则创建该文件
  'ax': 作用与'a+'类似，但是以排他方式写入文件
- encoding属性指定编码格式('utf8', 'ascii', 'base64'),默认为一个存放了文件原始二进制内容的缓存区对象;
callback: 读取完毕执行的回调操作
```js
function(err, data) {

}
```
同步
```js
const data = fs.readFileSync(filename, [options]);
```
```js
var fs = require('fs');
try {
    var data = fs.readFileSync('./index1.html', 'utf8');
    console.log(data);
} catch(err) {
    console.log('读取文件时发生错误');
}

```

### 写入文件
```js
fs.writeFile(filename, data, [options], callback);
```
filename: 指定需要被写入文件的完整文件路径及文件名;
data: 字符串或一个Buffer对象,该字符串或缓存区的内容将被完整地写入到文件中
option:
- flag: 默认为'w'(文件不存在时创建该文件, 文件已存在时,重写该文件)
- mode: 指定当文件被打开时该文件的读写权限,默认值为066(可读写);
- encoding: 指定使用何种编码格式来写入文件, data参数为一个Buffer对象时改属性克忽略,使用默认编码格式utf8来执行文件的写入
callback: 回调函数使用一个参数,参数数值为写入文件操作失败时触发的错误对象
```js
function(err) {

}
```
复制'a.jpg'到'b.jpg'
```js
fs.readFile('./a.jpg', 'base64', (err, data) => {
    // 操作结果作为回调函数的第二个参数返回
    fs.writeFile('./b.jpg', data.toString(), 'base64',  (err) => {
        if(err) {
            console.log('写文件失败');
        } else {
            console.log('写文件成功');
        }
    })
})
```
同步
```js
fs.writeFileSync(filename, data, [options]);
```
将一个字符串或者一个缓存区中的数据追加到一个文件底部，使用fs模块中的appendFile方法或者appendFileSync
```js
fs.appendFile(filename, data, [option], callback)；
fs.appendFileSync(filename, data, [option])
```
参数含义同writeFile,区别是options的flag属性的默认值为'a'(在文件底部追加数据，如果文件不存在，则创建 该文件)；

### 从指定位置开始读写 
```js
fs.open(filename, flags, [model], callback);
```
callback参数用于指定 文件打开操作 执行完毕时执行的回调函数
```js
function(err, fd) {
    // 回调函数代码简略
}
```
第二个参数是一个整数值，代表打开文件时返回的文件描述符(在windows操作系统中，文件描述符亦称文件句柄);
```js
var fd = fs.openSync(filename, flags, [model]);
```
打开文件之后，可以用read或readSync方法从文件指定位置处读取文件，可以使用write或writeSync方法从文件的指定处开始写入数据

read：从文件的指定位置处读取文件，一直读取到的内容输出到一个缓存区
```js
fs.read(fd, buffer, offset, length, position, callback);
```
fd:open方法的回调函数中返回的文件描述符或openSync方法返回的文件描述符
buffer: 一个Buffer对象，用于指定将文件数据读取到哪个缓存区
offset：用于指定向缓存区中写入数据的开始写入位置(以字节为单位)
length:指定从文件读取的字节数
position:指定读取文件时的开始位置(以字节为单位)
callback:
```js
function (err,bytesRead, buffer) {

}
```
- err: 读取文件操作失败时所触发的错误对象，
- bytesRead: 一个整数值，代表实际读取的字节数(由于文件的开始读取位置+指定读取的字节数可能大于文件长度，指定读取的字节数可能并不等于实际读取的字节数)
- buffer:被读取到的缓存区对象


从应用程序的根目录下的内容为'我喜爱编程'字符串的test.txt文件将'喜爱编'这三个字符读取到一个缓存区，然后从缓存区中读取出这三个字符
```js
var fs = require('fs');
fs.open('./test.txt', 'r', (err, fd) => {
   var buf = new Buffer(225);
   fs.read(fd, buf, 0, 9, 3, (err, bytesRead, buffer) => {
       console.log(buffer.slice(0, bytesRead).toString());
   })
})

```
同步
```js
var bytesRead = fs.readSync(fd, buffer, offset, length, position);
```

可以使用fs的write或writeSync方法从一个缓存区中读取数据并且从一个文件的指定处开始写入这些数据
```js
fs.write(fd, buffer, offset, length. position, callback);

function(err, written, buffer) {
    // written为一个整数值，代表被写入的字节数
}
```
使用'我喜爱编程'字符串创建一个缓存区然后使用write方法从缓存区读取'喜爱编'这三个字符并将其写入到应用程序根目录message.txt文件中
```js
var buf = new Buffer('我喜爱编程');
fs.open('./message.txt', 'w', (err, fd) => {
    fs.write(fd, buf, 3, 9, 0, (err, written, buffer) => {
        if(err) {
            console.log('写入文件失败');
        }
        console.log('写入文件成功', written, buffer)
    })
})

写入文件成功 9 <Buffer e6 88 91 e5 96 9c e7 88 b1 e7 bc 96 e7 a8 8b>
```
当对文件的读写操作执行完毕后，我们通常需要关闭该文件，尤其是在文件以排他方式被打开的时候；
fs模块中提供了close及closeSync方法以关闭文件
```js
fs.close(fd, [callback]);
fs.closeSync(fd);
```
使用write或writeSync方法在文件中时，操作系统 的做法是首先将该部分数据读到内存中，再把数据写到文件中，当数据读完时不代表数据已经写完，因为还有一部分有可能留在内存缓存区，这时使用close方法关闭文件，那么这部分数据就会丢失，这时可以使用fs模块中的fsync方法对文件进行同步操作，即将内存缓冲区中的剩余数据全部写入文件
```js
fs.fsync(fd, [callback]);
fs.fsyncSync(fd);

```

## 创建目录
```js
fs.mkdir(path, [mode], callback);
fs.mkdirSync(path, [mode]);
```
path:指定需要被创建的目录完整路径及目录名
mode: 指定该目录的权限，默认值为0777(表示任何人可读写该目录)
callpack: 创建目录操作完毕时调用的回调函数，参数值为创建目录失败时触发的错误对象；

## 读取目录
```js
fs.readdir(path, [callback]);
const files = fs.readdirSync(path);
```
path: 需要被读取的目录的完整路径及目录名
callback
```js
function(err, files) {

}
```
files: 是一个数组，其中存放了读取到的文件中所有的文件名

## 查看问阿金或目录的信息
stat方法或者lstat方法查看一个文件或目录的信息，当查看符号链接文件的信息时，必须使用lstat方法
```js
fs.stat(path, callback);
fs.lstat(path, callback);
```
path: 需要被查看的文件或目录的完整路径及文件名或目录名
callpack:
```js
function(err, stats) {

}
```
stats: 是一个fs.stats对象
使用open或openSync打开文件后可以使用fstat查看文件的方法
```js
fs.fstat(fd, [callback]);
const stats = fs.fstatSync(fd);
```
## 检查目录是否存在
```js
fs.exists(path, callback);
const exists = fs.existsSync(path);
```
callpack: 一个参数，文件或目录存在时，该参数值为true,当文件和目录不存在时，该参数值为false
```js
function(exists) {

}
```
## 获取文件或目录的绝对路径
```js
fs.realpath(path, [cache], callback)
```
callpack: 
```js
function(err, resolvedPath) {

}
```
resolvedPath: 获取到的文件或目录的绝对路径
## 修改文案访问时间及修改时间
```js
fs.utimes(path, atime, mtime, callpack);
fs.utimesSync(path, atime, mtime);
```
atime: 指定修改后的访问时间
mtime:指定修改后的修改时间;
callpack: 一个参数,修改文件时间操作失败时触发的错误对象

使用open或openSync打开文件并返回文件描述符后可以使用futimes修改文件的访问时间或修改时间
```js
fs.futimes(fs, atime, mtime,callback);
fs.futimesSync(fs, atime, mtime);
```
## 修改文件或目录的读写权限
```js
fs.chmod(path, mode, callback);
fs.chmodSync(path, mode);
fs.fchmod(fd, mode, callback);
fs.fchmodSync(fd, mode);
```

## 移动文件或目录
```js
fs.rename(oldPath, newPath, callback);
fs.renameSync(oldPath, newPath);
```

## 创建与删除文件的硬链接
硬链接: 文件的一个或者多个文件名,在操作系统,一个文件被创建之后就拥有了一个文件名,因此该文件的硬链接数据为1,但是我们可以通过特殊操作为改文件再指定一个文件名,这种特殊操作称为对改文件创建链接;表面上看起来拥有两个不同的文件,但是在硬盘中这两个文件不过是同一个文件的多个硬链接,如果修改一个文件的内容再打开另一个文件,发现,文件被修改

```js
fs.link(srcpath, dstpath,callback);
fs.linkSync(srcpath, dstpath);
```
srcpath: 指定需要被创建硬链接的文件的完整路径及文件名
dstpath: 指定被创建硬链接的文件的完整路径及文件名

删除文件的硬链接
```js
fs.unlink(path, callpack);
fs.unlinkSync(path)
```
path: 指定被删除硬链接操作完毕时调用的函数

## 创建与查看符号链接

符号链接: 一种特殊的文件,这个文件包含了另一个文件或目录的路径及文件名或目录名,如果打开一个文件的符号链接文件进行编辑,操作系统将自动打开符号链接中所指向的原文件进行编辑

创建文件或目录的链接符号
```js
fs.symlink(srcpath, dstpath, [type], callback);
fs.symlinkSync(srcpath, dstpath, [type]);
```
srcpath: 需要被创建符号链接的文件或目录的完整路径及文件或目录名
dstpath: 指定被创建符号链接的文件或目录的完整路径及文件或目录名
type: 可选,指定为文件创建符号链接还是为目录创建符号链接
- file: 为文件创建符号链接
- dir:目录(非windows操作系统中只能使用dir参数值)


读取符号链接中所包含的另一个文件或目录的路径及目录名
```js
fs.readlink(path, callback);

funciton(err, linkString) {
    // linString: 读取到的一个链接字符串,另一个文件或目录的路径及目录名
}


var linkString = fs.readlinkSync(path);
```
- path: 指定符号链接的路径及文件名

## 截断文件
```js
fs.truncate(filename, len, callback);
fs.truncateSync(filename, len);

fs.ftruncate(fd ,len, callback);
fs.ftruncate(fd, len, callback);

```
- len: 整数数值, 用于指定被截断后的文件尺寸(以字节为单位);
## 删除空目录

```js
fs.rmdir(path, callback);
fs.rmdirSync(path);
```
## 监视文件或目录
```js
fs.watchFile(filename, [options], listener);
```
options: 一个对象
- persistent: 布尔值, 指定了被监视的文件后是否停止当前正在运行的应用程序,默认值为true
- interval: 每隔多少毫秒监视一次文件是否发生改变以及发生了什么改变

listener: 指定当被监视的文件发生改变时调用的回调函数
```js
funciton(curr, prev) {

}
```
curr参数值为一个fs.Stats对象,代表被修改之后的当前文件;
prev参数值为一个fs.Stats对象,代表被修改之前的当前文件;
## 文件流

readFile/readFileSync: 将文件完整读入缓存区
read/readSync: 将文件部分读入缓存区
writeFile/writeFileSync: 将数据完整写入文件
write/writeSync: 将文件中的部分内容写入文件

readFile/readFileSync 读取文件内容 或者 writeFile/writeFileSync 写入文件内容时,Node.js将文件内容视为一个整体,为其分配缓存区并且一次性将文件内容读取到缓存区,在这个期间,Node.js将不能执行任何其他处理
如果使用read/readSync 方法读取文件内容,Node.js将不断地将文件中一小块内容读取入暂存区,如果使用write/writeSync, 执行过程如下:
1.将需要书写的数据写入到一个内存缓存区
2.待缓存区写满后再讲改缓存区中内容写入到文件中
3.重复执行1和2,知道数据全部写入文件为至
也就是在读写的过程中允许Node.js执行其他处理

Node.js中可以使用flowing模式与非flowing模式来读取数据,使用flowing模式时,操作系统的内部I/O机制来读取数据,以最快的速度来读取数据,使用非flowing模式,必须显式调用对象的read方法来读取数据



