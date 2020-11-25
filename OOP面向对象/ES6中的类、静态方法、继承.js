
//定义Person类
class Person {
    // 静态属性
    static PI = Math.PI;

    // 静态方法
    static work() {
        console.log('这是es6里面的静态方法');
    }

    // 构造函数 -> 类的构造函数，实例化的时候执行，new的时候执行
    constructor(name, age) {
        /*属性*/
        this.name = name;
        this.age = age;
    }
    // 实例方法
    getName() {
        console.log(this.name);

    }
    setName(name) {
        this.name = name
    }
    getInfo() {
        console.log(`姓名:${this.name} 年龄:${this.age}`);
    }
}
// 静态属性
Person.instance = '这是一个静态属性';
// 静态方法
Person.staticFun = function() {
    console.log('这是一个静态方法');
};

// 实例类
const p = new Person('张三', '26');
p.getName();
p.setName('李四');
p.getName();

/*调用静态方法*/
Person.work();
Person.staticFun();

/*获取静态属性*/
console.log(Person.instance);
console.log(Person.PI);






//ES6里面的继承 继承了Person     extends       super(name,age);
class Web extends Person {

    constructor(name, age, sex) {
        // 实例化子类的时候把子类的数据传给父类
        super(name, age);
        this.sex = sex;
    }
    print() {
        console.log(this.sex);
    }
}
const w = new Web('王五', '30', '女');

w.getInfo();
w.print();
