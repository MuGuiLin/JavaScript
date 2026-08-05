// importScripts('./spark-md5.min.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/spark-md5/3.0.0/spark-md5.min.js');

self.onmessage = async (e) => {
    const { type, file, chunk_size } = e.data;
    if (type !== 'file-hash') {
        throw new Error('未知的消息类型！');
    }
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReader();

    // 计算文件的总切片数
    const totalChunks = Math.ceil(file.size / chunk_size);
    // 当前切片索引
    let chunkIndex = 0;

    // 读取下一个切片内容
    const loadNextChunk = () => {
        // 计算当前切片的起始字节位置
        const start = chunkIndex * chunk_size;
        const end = Math.min(start + chunk_size, file.size);
        // 读取当前切片内容
        const nextChunk = file.slice(start, end);
        // 开始读取当前切片内容
        reader.readAsArrayBuffer(nextChunk);
    }

    reader.onload = (e) => {
        // 将读取到的文件切片内容，喂给spark-md5进行hash值计算
        spark.append(e.target.result);
        // 切片索引增加
        chunkIndex++;
        // 将每次切片hash值计算进度发送给主线程
        self.postMessage({
            type: 'file-progress',
            data: (chunkIndex / totalChunks * 100).toFixed(2)
        });
        // 如果还有切片未计算，继续读取下一个切片内容
        if (chunkIndex < totalChunks) {
            // 读取下一个切片内容
            loadNextChunk();
        } else {
            // 如果所有切片都计算完成，将hash值结果发送给主线程
            self.postMessage({
                type: 'file-result',
                data: spark.end()
            });
            
            // 计算完成后，关闭worker线程
            // self.close();
        }
    };

    // 启动切片，从读取第一个切片内容开始
    loadNextChunk();
};