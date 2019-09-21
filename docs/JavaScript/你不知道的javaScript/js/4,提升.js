foo(); //不是ReferenceError,而是TypeError
bar();//ReferenceError
var foo = function bar() {
    // ...
}
