let dropDashedElement = document.querySelector('.drop_dashed');

/** 
 * 当有文件拖放到浏览器的时候，显示 dropDashedElement
 */
document.body.ondragover = function(e) {
    e.dataTransfer.setData('text', '');
    console.log('sdsd');

    dropDashedElement.style.display = 'block';
}

