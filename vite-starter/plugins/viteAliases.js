const fs = require("fs")
const path = require("path")
function getResolveDir() {
    const ResolveRes = {
        files: [],
        dirs: []
    }
    const result = fs.readdirSync(path.resolve(__dirname, "../src"))
    let fileInfo = null;
    result.forEach (item => {
        fileInfo =fs.statSync(path.resolve(__dirname, "../src" + "/" + item))
        if (fileInfo.isDirectory()) {
            ResolveRes.dirs.push(item)
        } else {
            ResolveRes.files.push(item)
        }

    })
    const resolveAliases = handleDir(ResolveRes.dirs, '@')
    // console.log(resolveAliases);
 
    return resolveAliases
}
function handleDir(dirs, prefix) {
    const resolveAliasesObj = {
        [prefix]: path.resolve(__dirname, "../src")
    }
    dirs.forEach( dir => {
        const key = `${prefix}${dir}`
        const pathValue =path.resolve(__dirname, "../src" + "/" + dir)
        // console.log(__dirname, pathValue);
        resolveAliasesObj[key] = pathValue
    })
    return resolveAliasesObj
}
module.exports = () => {
    return {
        config (config, env){
            // console.log("config ==> ", config, env);
            const resolveDir = getResolveDir();
            console.log("resolveDir ==> ", resolveDir);
            return {
                resolve: {
                    alias: resolveDir
                }
            }
        }
    }
}