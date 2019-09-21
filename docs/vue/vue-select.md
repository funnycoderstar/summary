> 自己封装的一个select组件

```js
<template>
    <div class="searchList fix-float"
         :class="{fixSearch:scrolled}">
        <ul class="searchTitle fix-float">
            <li @click="showList(1)"
                :class="{redColor: distance !== '任意'}">{{distance === '任意' ? '公里数' : distance}}<i class="icon iconList"
                   v-html="'&#xe671;'"
                   :class="{redColor: distance !== '任意'}"></i></li>
            <li @click="showList(2)"
                :class="{redColor: day !== '任意'}">{{ day === '任意' ? '周出勤' : day}}<i class="icon iconList"
                   v-html="'&#xe671;'"
                   :class="{redColor: day !== '任意'}"></i></li>
            <li @click="showList(3)"
                :class="{redColor: dayMoney !== '任意(元)'}">{{ dayMoney === '任意(元)' ? '日契约金' : dayMoney}}<i class="icon iconList"
                   v-html="'&#xe671;'"
                   :class="{redColor: dayMoney !== '任意(元)'}"></i></li>
            <li@click="showList(4)" :class="{redColor: composite !== '综合'}">{{ composite === '综合' ? '综合' : composite}}<i class="icon iconList"
                   v-html="'&#xe671;'"
                   :class="{redColor: composite !== '综合'}"></i></li>
        </ul>
        <ul class="searchDetails item1"
            v-show="isShowList === 1">
            <li v-for="(item,index) in distanceItems"
                :class="{redColor: distance === item}"
                @click="chooseDistance(index)">
                {{item}}
            </li>
        </ul>
        <ul class="searchDetails item2"
            v-show="isShowList === 2">
            <li v-for="(item,index) in dayItems"
                :class="{redColor: day === item}"
                @click="chooseDay(index)">
                {{item}}
            </li>
        </ul>
        <ul class="searchDetails item3"
            v-show="isShowList === 3">
            <li v-for="(item,index) in dayMoneyItems"
                :class="{redColor: dayMoney === item}"
                @click="chooseDayMoney(index)">
                {{item}}
            </li>
        </ul>
        <ul class="searchDetails item4"
            v-show="isShowList === 4">
            <li v-for="(item,index) in compositeItems"
                :class="{redColor: composite === item}"
                @click="chooseComposite(index)">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'searchList',
    data() {
        return {
            isShowList: 0,
            distance: '任意',
            day: '任意',
            dayMoney: '任意(元)',
            composite: '综合',
            distanceItems: [ '任意', '2KM', '3KM', '5KM', '8KM', '10KM', ],
            dayItems: [ '任意', '3天', '4天', '5天', '6天', '7天', ],
            dayMoneyItems: [ '任意(元)', '1~15', '16~50', '51~100', '100以上', ],
            compositeItems: [ '综合', '人气优先', '奖金优先', '最近开跑', ],
            scrolled: false,
        };
    },
    created() {
        window.addEventListener('scroll', this.onScroll);
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        showList(item) {
            if (this.isShowList === 0) {
                this.isShowList = item;
            } else {
                this.isShowList = 0;
            }
        },
        onScroll() {
            if (window.scrollY > 172) {
                this.scrolled = true;
            } else {
                this.scrolled = false;
            }
        },
        chooseDistance(index) {
            this.distance = this.distanceItems[index];
            this.isShowList = 0;
        },
        chooseDay(index) {
            this.day = this.dayItems[index];
            this.isShowList = 0;
        },
        chooseDayMoney(index) {
            this.dayMoney = this.dayMoneyItems[index];
            this.isShowList = 0;
        },
        chooseComposite(index) {
            this.composite = this.compositeItems[index];
            this.isShowList = 0;
        },
    },
};
</script>

<style lang="less">
@import '../../lib/util.less';
.fixSearch {
    position: fixed;
    .searchTitle {
        border-bottom: 1px solid #e5e5e5;
        border-top: 1px solid #e5e5e5;
    }
}
.searchList {
    background-color: #fff; // position: fixed;
    width: 100%;
    .xtr(top, 40);
    z-index: 300;
    .searchTitle {
        .xtr(padding, 10);
        .xtr(padding-top, 12);
        .xtr(font-size, 12);
        color: #969696;
        box-sizing: border-box;
        li {
            float: left;
            width: 25%;
            text-align: center;
            .iconList {
                .xtr(font-size, 12);
            }
        }
    }
    .searchDetails {
        position: absolute;
        z-index: 50;
        .xtr(font-size, 12);
        .xtr(width, 320);
        color: #969696;
        background-color: #fff;
        box-sizing: border-box;
        li {
            .comDis(padding, 10, 20);
            border-top: 1px solid #e5e5e5;
        }
        li:nth-of-type(1) {
            // color: #fc4548;
        }
    }
    .item1 {
        li {
            .xtr(padding-left, 25);
        }
    }
    .item2 {
        li {
            .xtr(padding-left, 100);
        }
    }
    .item3 {
        li {
            .xtr(padding-left, 180);
        }
    }
    .item4 {
        li {
            .xtr(padding-left, 250);
        }
    }
}
</style>

```
lib/util.less

```
xtr(@name,@px){
    @{name}: @px * 2 / 64 * 1rem;
}
.xtrM(@name,@px){
    @{name}: @px * 2 / 64 * 1rem !important;
}
.comDis(@name,@px1,@px2){
    @{name}: @px1 * 2 / 64 * 1rem  @px2 * 2 / 64 * 1rem;
}

```
