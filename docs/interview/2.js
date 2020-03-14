function Foo(name, age) {
    this.name = name;
    this.age = age;
}
Foo.prototype.getName = function() {
    this.name;
}

function Foo1(name, age) {
    this.name = name;
    this.age = age;
}
Foo1.prototype.getAge = function() {
    this.age;
}

const foo = new Foo('a', 10);
Object.setPrototypeOf(Foo.prototype, Foo1.prototype);
foo.getName();

function Foo2(name, age) {
    this.name = name;
    this.age = age;
}
Foo2.prototype = Foo.prototype;
console.log(Foo2.prototype.getName);
const foo2 = new Foo2('aaa');

Foo2.getName();