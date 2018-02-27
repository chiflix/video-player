# video-player 
[![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)](https://github.com/dwyl/goodparts "JavaScript The Good Parts")

# electron降级（新版electron会导致播放卡顿）
+ 进入项目文件根目录
+ 删除原有版本：
+ npm uninstall electron -g
+ npm uninstall electron
+ 
+ 安装旧版本：
+ npm install electron-prebuilt [-g]

# clone后运行软件的方法
+ 安装node: brew install node
+
+ 在终端中进入项目根目录
+ 安装electron: npm install electron-prebuilt [-g]
+
+ 查看app运行情况: npm start
+
+ 安装app打包程序: npm install electron-packager
+ 打包app: electron-packager . theNameOfTheApp --electron-version=yourElectronVersion [--overwrite]
+ 其中打包时使用的electron版本可以指定为1.4.13

# 使用eslint的方法
+ 安装eslint: npm install eslint --save-dev
+ 查看eslint检测情况: npm run lint

# NQ和ZY的临时命名规范
[force] 命名不使用缩写(紫嫣女士说不能用拼音)

[force] 字符串尽量使用单引号

[force] 使用4个空格作为缩进, 如

    switch(a) {
        case('2'): {
            //do something
            break;
        }
        default: {
            //do something else
            a += '2';
        }
    }

[force] 函数以动词开始, 小写驼峰式命名, 如 getElementById

[force] 变量全小写, 下划线隔开, 如 this_is_a_variable

[force] 类名和枚举名使用大写驼峰式命名, 如 ThisIsClass

[force] 数据常量使用全大写命名, 用下划线分隔开, 如 INITIAL_VALUE

[force] 函数名太长或参数名太长可以换行, 如 

    function thisIsALongFunction
        (longInput1, longInput2) {
        // do something here
    }

    let returnedValue = someFunction(param1, [
        1,
        2,
        3,
    ], param2);

[force] 请用眼部观察

    if(a) {
        //do something
    } else {
        //do something
    }

    try {
        //do something
    } catch(error) {
        //do something
    }
