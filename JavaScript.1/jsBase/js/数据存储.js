// cookie 可以通过document.cookie访问cookie

// IE发明了一种叫做用户数据的行为,可以应用到页面的某个元素
// 1,一旦应用后,该元素便可以从一个命名数据空间中载入数据,然后通过getAttribute(),setAttribute(),和removeAttribute()方法访问
// 2,数据必须明确使用save()方法保存到命名数据空间,持久化数据


// Web Storage 定义了两种用于存储数据的对象 :sessionStorage 和 localStorage

IndexedDB 是一种类似SQL数据库的结构化数据存储机制,但他的数据是保存在对象存储空间中,
创建对象村存储空间时,需要定义一个键,然后就可以添加数据,可以使用游标在对象存储空间中查询特定的对象,而索引则是为了提高查询速度而基于特定的属性创建的