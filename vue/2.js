const arr1 = [{
        id: 1,
        name: 'aa',
    },
    {
        id: 2,
        name: 'bb',
    },
    {
        id: 3,
        name: 'cc',
    },
    {
        id: 4,
        name: 'dd',
    }
];
const arr2 = [{
        id: 1,
        name: 'aa',
    },
    {
        id: 2,
        name: 'bb',
    },
]

const arr = arr1.filter(x => arr2.find(y => y.id === x.id));
console.log(arr);
