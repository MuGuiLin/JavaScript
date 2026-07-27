// hashWorker.js
try {
    // 在 Worker 中引入 SparkMD5 库
    importScripts('./spark-md5.js');
    if (!self.SparkMD5) throw new Error('SparkMD5 引入后未挂载到 self 上');
} catch (e) {
    self.postMessage({
        type: 'error',
        data: { message: 'SparkMD5 引入失败，请检查路径是否为 ./spark-md5.js', error: e.message }
    });
    self.close();
}


// 监听主线程发来的消息
self.onmessage = async (e) => {
    const { file, chunkSize, chunkCount } = e.data;
    const chunks = [];

    // 串行处理每个分片
    for (let i = 0; i < chunkCount; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const blob = file.slice(start, end);

        // 在 Worker 内部使用 FileReader 读取并计算哈希
        const hash = await readAndHash(blob);

        chunks.push({
            start,
            end,
            index: i,
            hash: hash,
            // 注意：Worker 中计算出的 blob 无法直接传回主线程用于上传，
            // 如果需要上传，建议在主线程重新 slice，或者在这里返回 ArrayBuffer
        });

        // 向主线程发送进度更新
        self.postMessage({
            type: 'progress',
            data: {
                percent: ((i + 1) / chunkCount * 100).toFixed(2),
                current: i + 1,
                total: chunkCount
            }
        });
    }

    // 计算完成，将所有结果传回主线程
    self.postMessage({
        type: 'done',
        data: { chunks }
    });
};

// 封装读取和计算逻辑
const readAndHash = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const hash = SparkMD5.ArrayBuffer.hash(e.target.result);
            resolve(hash);
        };
        reader.onerror = () => reject(new Error('Worker 中文件读取失败'));
        reader.readAsArrayBuffer(blob);
    });
};