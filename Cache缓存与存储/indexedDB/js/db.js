const IndexedDB = {
  db: null,
  dbName: "",
  version: '',
  indexedDB: window.indexedDB ||
    window.webkitindexedDB ||
    window.msIndexedDB ||
    window.mozIndexedDB,
  async connectDB(dbName, version, callback = (() => {})) {
    return new Promise((resolve, reject) => {
      let request = this.indexedDB.open(dbName, version)
      request.onerror = (err) => {
        console.error('open indexedDB failed', err)
        // VER_ERR 表明存储在磁盘上的数据库的版本高于你试图打开的版本
        this.db = null
        reject(null)
      }
      request.onsuccess = (event) => {
        this.db = event.target.result
        this.dbName = dbName
        this.version = version
        callback(this.db)
        resolve(event.target.result)
      }
      // 创建一个新的数据库或者增加已存在的数据库的版本号
      request.onupgradeneeded = (event) => {
        this.db = event.target.result
        this.dbName = dbName
        this.version = version
        this.callback = callback
        callback(this.db)
        // resolve(event.target.result)
      }
    })
  },
  /**
   * 初始化，连接数据库
   * @param {*} dbName 
   * @param {*} version 不能使用浮点型，会自动取整
   */
  async openDB(dbName, version, callback) {
    if (this.db) {
      return this.db
    }
    if (!dbName && !this.dbName) {
      throw new Error('database name is Empty')
    }
    this.db = await this.connectDB(dbName || this.dbName, version || this.version, callback)
  },
  /**
   * 获取仓库对象（IDBObjectStore），类似于数据库表
   * 用于创建数据库表，拿到此对象后创建索引
   */
  async createObjectStore(storeName, key = 'id') {
    await this.openDB()
    // 已经存在的情况，不考虑删表再建，会丢失数据
    if (this.db.objectStoreNames.contains(storeName)) {
      // throw new Error('ObjectStore is created') 
      return false
    }
    return this.db.createObjectStore(storeName, {
      keyPath: key
    }) // 建表;
  },
  /**
   * 添加数据
   * @param {*} storeName 仓库名称
   * @param {*} data 需要存储的数据
   * @param {*} itemSuccessFn 单个执行成功的方法
   */
  async add(storeName, data = [], itemSuccessFn) {
    return await this.operate(storeName, data, itemSuccessFn)
  },
  /**
   * 更新数据
   * @param {*} storeName 仓库名称
   * @param {*} data 需要更新的数据，不存在就新增
   * @param {*} itemSuccessFn 单个执行成功的方法
   */
  async update(storeName, data = [], itemSuccessFn = (() => {})) {
    return await this.operate(storeName, data, itemSuccessFn)
  },
  /**
   * 删除数据
   * @param {*} storeName 仓库名
   * @param {*} key 需要输出的keyPath
   * @param {*} itemSuccessFn 单个执行成功的方法
   */
  async delete(storeName, key = [], itemSuccessFn = (() => {})) {
    return await this.operate(storeName, key, itemSuccessFn, 'delete')
  },
  async operate(storeName, data = [], itemSuccessFn = (() => {}), type = 'put') {
    try {
      await this.openDB()
      // 事务希望跨越的对象存储空间的列表
      let transaction = this.db.transaction([storeName], IDBTransaction.READ_WRITE || 'readwrite')
      let objStore = transaction.objectStore(storeName)
      data = Array.isArray(data) ? data : [data]
      data.forEach(i => {
        let _request = objStore[type](i)
        _request.onsuccess = (event) => {
          // event.target.result === i.key; 对象仓库使用 key 属性作为键路径（key path)
          typeof itemSuccessFn === 'function' && itemSuccessFn(event.target.result)
        }
      })
      return new Promise((resolve) => {
        // 使用事务的 oncomplete 事件确保所有数据都被添加完毕
        transaction.oncomplete = () => {
          resolve(true)
        }
        // 事务error处理
        transaction.onerror = () => {
          resolve(false)
        }
      })
    } catch (err) {
      console.error('operate data failed', err)
      return Promise.resolve(false)
    }
  },
  /**
   * 获取单行数据
   * @param {*} storeName 需要查询的仓库
   * @param {*} key 传了key就制定key去查找数据，不传就查所有数据
   * @param {*} storeIndex 索引，可以让你搜索任意字段，也就是说从任意字段拿到数据记录。如果不建立索引，默认只能搜索主键（即从主键取值）
   */
  async getData(storeName, key, storeIndex) {
    try {
      await this.openDB()
      // 事务希望跨越的对象存储空间的列表
      let transaction = this.db.transaction([storeName], 'readonly')
      let objStore = transaction.objectStore(storeName)
      // 获取查看范围数据对象
      let request = key ? (storeIndex ? objStore.index(storeIndex).get(key) : objStore.get(key)) : objStore.openCursor()
      return new Promise((resolve) => {
        let data = []
        request.onsuccess = (event) => {
          if (!key) {
            let cursor = event.target.result
            if (cursor) {
              data.push(cursor.value)
              cursor.continue()
            } else {
              resolve(data)
            }
          } else {
            if (event.target.result) {
              resolve([event.target.result])
            } else {
              resolve([])
            }
          }
        }
        request.onerror = () => {
          resolve([])
        }
      })
    } catch (err) {
      console.error('add data failed', err)
      return Promise.resolve([])
    }
  }
}

globalThis.IndexedDB = IndexedDB;
// export default IndexedDB;