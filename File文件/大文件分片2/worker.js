// import md5 from "./md5.js";

// 创建文件分片
const createChunk = (file, index, chunkSize) => {
    // console.log(file, index, chunkSize);
    return new Promise((resolve, reject) => {
        const start = index * chunkSize;
        const end = start + chunkSize;
        // 文件切片
        const blob = file.slice(start, end);
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            // console.log(e.target.result);
            resolve({
                start,
                end,
                index,
                // hash: md5(index),
                blob,
            });
        };

        // fileReader.onerror = (e) => {
        //     reject(e);
        // };

        // fileReader.onprogress = (e) => {
        //     console.log('切片进度：', e);
        // };

        fileReader.readAsArrayBuffer(blob);
    })
};

onmessage = async (e) => {
    const { file, CHUNK_SIZE, startChunkIndex, endChunkIndex } = e.data;
    const chunks = [];
    for(let i = startChunkIndex; i < endChunkIndex; i++) {
        chunks.push(createChunk(file, i, CHUNK_SIZE))
    }
    postMessage(await Promise.all(chunks))
}