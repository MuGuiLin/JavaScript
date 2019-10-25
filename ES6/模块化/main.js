
let database = '127.0.0.1:8080';

const config = {
    __URL__ : 'http://www.baidu.com',
    IP: 3.1415926,
};

class Apple {
    constructor(opts) {
        // super(opts);
        this.name = opts.name;
        this.price = opts.price;

        this.init();
    };

    init() {
        console.log('Apple初始化成功！');
    };

    show() {
        console.log(this.name);
    }
    
};

// export default database;

// export default config;

// export default Apple;

export default { database: database, config, Apple};