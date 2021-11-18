# stringify

<p>stringify可以将对象或数组转化成javascript代码字符串，利用eval执行得到js对象或数组，大多数类型都能够进行转化，解决JSON.stringify转化不了非JSON类型的问题。</p>
<p>不要滥用stringify，请在特殊情况下才使用stringify，因为stringify的性能会比JSON.stringify慢十倍以上！</p>

## 用法
`const strJs = stringify(val)`
`eval(strJs)`

<p>其中val为对象或数组，在val内可以使用大多数的类型（Symbol、BigInt、Map、Set、Function等），对于val是对象时还可以使用Symbol作为属性</p>
<p>stringify只能复制字面量，也就是说stringify不能复制添加在原型链上的属性，如果需要复制构造函数那么需要使用ES6的class</p>
<p>stringify的类型判断是根据Object.prototype.toString来进行判断的，stringify无法对一部分类型或自定义类型（指通过改写get [Symbol.toStringTag]方法返回的类型）进行处理，会返回undefined</p>

## 例子
```javascript
    const obj = {
            a: NaN,
            b: '',
            c: true,
            d(){
                console.log('d')
            },
            e: async function*(){
                consoel.log('e')
            },
            f: class {},
            g: [],
            h: new Map([[{}, []]]),
            i: new Set([1,2,1,3]),
            j: /^j$/g,
            [Symbol('k')]: Symbol.for('k'),
            l: 18n,
            m: Math,
            n: new ArrayBuffer(9)
        }

    console.log(stringify(obj))
    /*
        ({a: NaN,b: '',c: true,d: function d() {
                console.log('d')
            },e: async function* () {
                consoel.log('e')
            },f: class A{ },g: [],h: new Map([[{}, []]]),i: new Set([1,2,3]),j: /^j$/g,l: 18n,m: Math,n: new ArrayBuffer(9),[Symbol('k')]: Symbol.for('k')})
    */
```
