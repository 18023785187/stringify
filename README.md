# stringify

<p>
    stringify可以将对象或数组转化成javascript代码字符串，利用eval执行得到js对象或数组，大多数类型都能够进行转化，解决JSON.stringify转化不了非JSON类型的问题。
</p>

## 用法
`const strJs = stringify(val)`
`eval(strJs)`

<p>其中val为对象或数组，在val内可以使用大多数的类型（Symbol、BigInt、Map、Set、Function等），对于val是对象时还可以使用Symbol作为属性</p>