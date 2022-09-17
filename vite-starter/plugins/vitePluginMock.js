const fs = require("fs");
const path = require("path");

module.exports = () => {
    return {
        configureServer(server){
            const mockStat = fs.statSync("mock");
            let mockResultArr = [];
            let mockFileDataArr = [];
            if( mockStat.isDirectory()) {
                mockResultArr = fs.readdirSync("mock")
                
                console.log("resultMap ====> ", mockResultArr);
                mockResultArr.forEach(item => {
                    mockFileDataArr = require(path.resolve(process.cwd(), 'mock/'+item));
                    console.log("mockFileData", mockFileDataArr,path.resolve(process.cwd(), 'mock/'+item));
                })
            }
            // 返回一个在内部中间件安装后
            // 被调用的后置钩子
            server.middlewares.use((req, res, next) => {
                console.log(req.url);
                mockFileDataArr.find(itemData => req.url === itemData.url)
                next()
            })
        }
    }
}