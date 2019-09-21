> #### 在vue中实现一个选择开始日期,输入持续天数,自动更改结束日期的功能,

```js
template>
    <ul class="setDays fix-float">
        <li>
            <p>开始</p>
            <select name=""
                    id="" v-model.number="selected">
                <option v-for="(item,index) in startDayItems" :value="index">{{item | formatDate}}</option>
            </select>
            <p class="line"></p>
        </li>
        <li>
            <p>持续</p>
            <p>
                <input type="number"
                        class="redcolor"
                        v-model.number="allDays"
                        min="14">
            </p>
            <p class="line"></p>
        </li>
        <li>
            <p>结束</p>
            <p class="graycolor">{{(Number(allDays) + selected) | formatDate}}</p>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            selected: 0,
            allDays: 14,
            rangeDay: 7,
            startDayItems: [ 0, 1, 2, 3, 4, 5, 6, ],
        };
    },
    watch: {
        allDays: {
            handler: function (val, oldVal) {
                <!--console.log('a thing changed', val, oldVal);-->
                this.rangeDay = (this.allDays / 2);
            },
            deep: true,
        },
    },
    filters: {
        formatDate(count) {
            const arr = [ '周日', '周一', '周二', '周三', '周四', '周五', '周六', ];
            const date = new Date();
            date.setDate(date.getDate() + count);
            const index = date.getDay();
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return year + '-' + month + '-' + day + '(' + arr[index] + ')';
        },
    },
};

```
- 因为涉及到数据的计算问题,所以必须准确知道v-model绑定的数据类型,但是v-model默认绑定的是String,所以应该怎么把v-model绑定为自己所想绑定的数据类型? 下面是参考 [从vue.js的源码分析，input和textarea上的v-model指令到底做了什么](https://baijiahao.baidu.com/po/feed/share?wfr=spider&for=pc&context=%7B%22sourceFrom%22%3A%22bjh%22%2C%22nid%22%3A%22news_3490559553363447430%22%7D)给出一些我自己的理解

- 添加修饰符
- v-model.trim 去除输入内容两侧的空格
- v-model.lazy 将默认监听的input事件改为监听change事件
在默认情况下， v-model 在 input 事件中同步输入框的值与数据 (除了 上述 IME(IME 的全称是 Input Method Editor 也就是我们常说的输入法
所谓IME 构成，是指我们在输入文字时，处于未确认状态的文字，以微软的中文输入法举例：) 部分)，但你可以添加一个修饰符 lazy ，从而转变为在 change 事件中同步.

```
function genDefaultModel(el: ASTElement, value: string, modifiers: ?ASTModifiers): ?boolean { const type = el.attrsMap.type const { lazy, number, trim } = modifiers || {} const needCompositionGuard = !lazy && type !== 'range' const event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input' let valueExpression = '$event.target.value' if (trim) { valueExpression = `$event.target.value.trim` } if (number) { valueExpression = `_n(${valueExpression})` } let code = genAssignmentCode(value, valueExpression) if (needCompositionGuard) { code = `if($event.target.composing)return;${code}` } addProp(el, 'value', `(${value})`) addHandler(el, event, code, null, true) if (trim || number || type === 'number') { addHandler(el, 'blur', '$forceUpdate') } }

v-model在编译的时候自动添加了一层判断，根据event.target.composing判断此次input事件是否是 IME 构成触发的
```

- v-model.number 自动把输入内容转为数字

```
从之前的源码来看，vue.js使用了一个_n函数来处理输入内容，也就是说v-model.number的行为可以这样模仿

_n 是一个toNumber 的工具函数

/** * Convert a input value to a number for persistence. * If the conversion fails, return original string. */ export function toNumber (val: string): number | string { const n = parseFloat(val) return isNaN(n) ? val : n }

它是使用parseFloat函数来转的数字，再使用isNaN判断转换结果，如果结果是NaN,那么就返回原字符串，否则返回转为数字后的结果；
```
number 修饰符不能限制输入内容,因为使用的是parsetFloat函数,


