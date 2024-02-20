//匹配文件后缀
export function matchFileSuffixType(fileName) {
    // 后缀获取
    var suffix = ''
    // 获取类型结果
    var result = ''
    try {
        var flieArr = fileName.split('.')
        suffix = flieArr[flieArr.length - 1]
    } catch (err) {
        suffix = ''
    }
    // fileName无后缀返回 false
    if (!suffix) {
        result = 'other'
        return result
    }
    // 图片格式
    var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'tif', 'tiff']
    // 进行图片匹配
    result = imglist.some(function (item) {
        return item == suffix
    })
    if (result) {
        result = 'image'
        return result
    }
    // 匹配txt
    var txtlist = ['txt']
    result = txtlist.some(function (item) {
        return item == suffix
    })
    if (result) {
        result = 'txt'
        return result
    }

    //匹配docx
    var txtlist = ['docx']
    result = txtlist.some(function (item) {
        return item == suffix
    })
    if (result) {
        result = 'docx'
        return result
    }
    //匹配xlsx
    var txtlist = ['xlsx']
    result = txtlist.some(function (item) {
        return item == suffix
    })
    if (result) {
        result = 'xlsx'
        return result
    }
    //匹配pptx
    var txtlist = ['pptx']
    result = txtlist.some(function (item) {
        return item == suffix
    })
    if (result) {
        result = 'pptx'
        return result
    }
    //匹配pdf
    var txtlist = ['pdf']
    result = txtlist.some(function (item) {
        return item == suffix
    })
    if (result) {
        result = 'pdf'
        return result
    }


    // 匹配代码文件
    var officelist = ['java', 'php', 'py', 'js', 'css', 'vue']
    result = officelist.some(function (item) {
        return item == suffix
    })
    if (result) {
        result = 'code'
        return result
    }
    // 匹配压缩文件
    var officelist = ['zip', 'rar', 'jar', 'tar', 'gzip']
    result = officelist.some(function (item) {
        return item == suffix
    })
    if (result) {
        result = 'zip'
        return result
    }
    // 匹配 视频
    var videolist = ['mp4', 'm2v', 'mkv']
    result = videolist.some(function (item) {
        return item == suffix
    })
    if (result) {
        result = 'video'
        return result
    }
    // 匹配 音频
    var radiolist = ['mp3', 'wav', 'wmv', 'flac']
    result = radiolist.some(function (item) {
        return item == suffix
    })
    if (result) {
        result = 'radio'
        return result
    }
    // 其他 文件类型
    result = 'other'
    return result
}
