// 原对象
let mupiao = {
    name: "mupiao",
    age: 18,
	sex: 'man',
    job: 'Web全栈开发'
}

// 监听对象（读取、修改）
mupiao = new Proxy(mupiao, {
    get: function (target, p, receiver) {
        console.log("get读取了属性:::", target, p, target[p])
        return target[p]
    },
    set(target, p, newValue, receiver) {
        console.log("set修改了属性:::", target, p, newValue, receiver)
        // return target[p] = newValue
        return Reflect.set(target, p, newValue);
    }
});

// 读取
console.log(mupiao.name)
console.log(mupiao.age)

// 修改
mupiao.age = 28
console.log(mupiao.age)

