const A = {
    a: '1',
    b: 3,
    c: {
        c1: '2',
        c2: '3',
    },
    e: '1',
};

const B = {
    a: '2',
    b: 3,
    c: {
        c1: '5',
        c2: '6',
        c3: '8',
    },
    d: [
        {
            d1: '5',
            d7: 88
        }
    ]
};

const C = {
    a: {
        oldValue: '1',
        newValue: '2',
        type: patch.MODIFY,
    },
}

patch.DELETE = 'DELETE'; // 节点被删除
patch.MODIFY = 'MODIFY'; // 文本节点被更改
patch.ADD = 'ADD'; // 添加节点


