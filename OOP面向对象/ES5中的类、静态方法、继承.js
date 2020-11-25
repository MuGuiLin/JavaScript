
//ES5中的类(构造函数)
function Person(name, age) {

    //构造函数属性
    this.name = name;
    this.age = age;

    //构造函数方法
    this.run = function () {
        console.log(`${this.name}---${this.age}`)
    }
}

//原型链属性
Person.prototype.sex = '男';
//原型链方法
Person.prototype.work = function (par) {
    par && console.log(par);
    console.log(`${this.name}---${this.age}---${this.sex}`);
}

//原型链属性和方法还可以这样写（这样写会覆盖前面 已经定义好相同名的属性 或 方法）
Person.prototype = {
    PI: Math.PI,
    sex: '男',
    work: function (par) {
        par && console.log(par);
        console.log(`${this.name}---${this.age}---${this.sex}`);
    },
    getAge: function() {
        return this.age;
    }
}

//静态属性
Person.myHeigth = 168;
//静态方法
Person.setName = function () {
    console.error('注：在静态方法不能调用类中的属性：', this.age);
    // console.log('注：在静态方法不能调用类中的方法：', this.run());
    console.log('静态方法');
}

/**
 * 在ES5中 构造函数属性、方法 和 原型链属性、方法的区别！
 *  1、构造函数中的属性、方法，每次实例化都要重新创建
 *  2、而原型链上的属性、方法，可以被多个实例共享(不会重新创建)，性能更好
 * 
 *  3、什么时候用构造函数中的属性、方法 和 原型链上的属性、方法？
 *      如果每次实例化都要归零的属性、方法 用（写在构造函数中）
 */


// 实例化类(构造函数)
var p = new Person('zhangsan', '20');   /*实例方法是通过实例化来调用的，静态是通过类名直接调用*/
p.run();
p.work();

console.log(p.PI);
console.log(p.getAge());


// 调用静态属性
console.log(Person.myHeigth);

// 调用静态方法
Person.setName();




/*ES5继承 原型链继承+对象冒充继承

 1、对象冒充继承：不能继承原型链上面的属性和方法，但是！实例化子类的时候可能给父类传参
 2、原型链继承：可以继承构造函数里面和原型链上面的属性和方法，但是！实例化子类的时候不能给父类传参

 3、由于以上两个方法各有所缺，所以把它俩一起使用就实现完美继承了！！
* */

function Web(name, age) {
    // 对象冒充继承
    Person.call(this, name, age);
}

// 原型链继承
Web.prototype = new Person();

// 实例化类
var w = new Web('李四', 20);
w.run();
w.work('我是继承时传来的参数');
w.getAge();