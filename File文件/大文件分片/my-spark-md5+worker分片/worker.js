
try {
    // 在 Worker 中引入 SparkMD5 库
    importScripts('./spark-md5.min.js');
    if (!self.SparkMD5) throw new Error('SparkMD5 引入后未挂载到 self 上');
} catch (e) {
    self.postMessage({
        type: 'error',
        data: { message: 'SparkMD5 引入失败，请检查路径是否为 ./spark-md5.js', error: e.message }
    });
    self.close();
}

// 创建抽样切片
function calculateChunkMd5(blob) {
    return new Promise((resolve, reject) => {
        const spark = new SparkMD5.ArrayBuffer();
        const offset = blob.size;
        const mid = Math.floor(offset / 2);
        const end = offset;
        const chunks = [];
        // 抽样每个blob切片的前2个字节、中间2个字节、后2个字节，来进行HASH值计算
        chunks.push(blob.slice(0, 2));
        chunks.push(blob.slice(mid, mid + 2));
        chunks.push(blob.slice(end - 2, end));

        let count = 0;
        const loadNext = (index) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(chunks[index]);
            reader.onload = (e) => {
                count++;
                spark.append(e.target.result);
                if (count === chunks.length) {
                    resolve(spark.end());
                } else {
                    loadNext(count);
                }
            };
            reader.onerror = reject;
        };
        loadNext(0);
    });
}


// 创建文件分片
const createChunk1 = (file, index, chunkSize) => {
    // console.log(file, index, chunkSize);
    return new Promise((resolve, reject) => {
        const start = index * chunkSize;
        const end = Math.min(start + chunkSize, file.size);

        // 文件切片
        const blob = file.slice(start, end);
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            // console.log(e.target.result);

            // 监听文件分片内容加载完成时，用文件分片内容计算HASH值，但这样做速度太慢了，可以考虑通过blob抽样的形式的计算HASH值
            const hash = SparkMD5.ArrayBuffer.hash(e.target.result);
            calculateChunkMd5
            resolve({
                index,
                start,
                end,
                hash,
                // blob, // 不建议在这里返回blob，因为blob过大，会造成内存泄漏，可以在分片上传是时再重新切片
            });
        };

        // fileReader.onloadstart = (e) => {
        //     console.log('切片开始：', e);
        // };

        // fileReader.onabort = (e) => {
        //     console.log('切片中断：', e);
        //     reject(e);
        // };

        // fileReader.onerror = (e) => {
        //     console.log('切片错误：', e);
        //     reject(e);
        // };

        // fileReader.onprogress = (e) => {
        //     console.log('切片进度：', e);
        // };

        // fileReader.onloadend = (e) => {
        //     console.log('切片结束：', e);
        // };

        // 开始读取指定 Blob 或 File 的内容（读取操作完成时，readyState 属性变为 DONE，并触发 loadend 事件）
        fileReader.readAsArrayBuffer(blob);
    })
};

// 创建文件分片
const createChunk = (file, index, chunkSize) => {
    // console.log(file, index, chunkSize);
    return new Promise(async (resolve, reject) => {
        const start = index * chunkSize;
        const end = Math.min(start + chunkSize, file.size);

        // 文件切片
        const blob = file.slice(start, end);

        // 通过blob抽样的形式的计算HASH值【注意：抽样性能虽好，但不能保证切片内容的完整性】
        const hash = await calculateChunkMd5(blob)
        
        resolve({
            index,
            start,
            end,
            hash
        });

    })
};

onmessage = async (e) => {
    const { file, CHUNK_SIZE, startChunkIndex, endChunkIndex } = e.data;
    const chunks = [];
    for (let i = startChunkIndex; i < endChunkIndex; i++) {
        chunks.push(createChunk(file, i, CHUNK_SIZE))
    }
    postMessage(await Promise.all(chunks))
}