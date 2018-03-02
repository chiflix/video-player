<div style="font-size: 50px; font-weight: 700; text-align: center;">
    video-player 
</div>

===
</br>

<div style="font-size: 35px; font-weight: 550;">
    Label
</div>

[![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)](https://github.com/dwyl/goodparts "JavaScript The Good Parts")

===
</br>

<div style="font-size: 35px; font-weight: 550;">
    安装electron (新版electron会导致播放卡顿)
</div>

1. 安装node.js:
    * `brew install node`
2. 进入项目文件根目录:
    * ***如果安装了新版本，则需将其删除：***
        1. `npm uninstall electron -g`
        2. `npm uninstall electron`
    * 安装旧版本 (1.4.13):
        * `npm install -g electron-prebuilt`
        * 或者 `npm install -g electron@1.4.13`
    
===
</br>

<div style="font-size: 35px; font-weight: 550;">
    clone后运行软件的方法
</div>

1. 在终端中进入项目根目录
2. 查看app运行情况: `npm start`
3. 安装app打包程序: `npm install electron-packager -g`
4. 打包app: `electron-packager . temp-player --electron-version=ElectronVersion [--overwrite]`
    * 其中打包时使用的electron版本可以指定为1.4.13

===
</br>

<div style="font-size: 35px; font-weight: 550;">
    关于eslint
</div>

* 使用
    1. 安装eslint: `npm install eslint --save-dev`
    2. 查看eslint检测情况: `npm run lint`
    3. 使用eslint自动更正部分错误: `npm run fix`
* 配置
    1. eslint的代码检测规则配置于***.eslintrc.json***中。

===
</br>

<div style="font-size: 35px; font-weight: 550;">
    命名规范
</div>

**[force]** 命名不使用缩写 (不用拼音)

**[force]** 字符串尽量使用单引号

**[force]** 使用4个空格作为缩进, 如:

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

**[force]** 函数以动词开始, 小写驼峰式命名, 如 `getElementById`

**[force]** 变量全小写, 下划线隔开, 如 `this_is_a_variable`

**[force]** 类名和枚举名使用大写驼峰式命名, 如 `ThisIsClass`

**[force]** 数据常量使用全大写命名, 用下划线分隔开, 如 INITIAL_VALUE

**[force]** 函数名太长或参数名太长可以换行, 如 

    function thisIsALongFunction
        (longInput1, longInput2) {
        // do something here
    }

    let returnedValue = someFunction(param1, [
        1,
        2,
        3,
    ], param2);

**[force]** 对于 `if` 等语句，分支与分支之间的换行采用以下方式

    if(a) {
        //do something
    } else if(b) {
        //do something
    } else {
        //do something more
    }

    try {
        //do something
    } catch(error) {
        //do something else
    }

===
</br>

<div style="font-size: 35px; font-weight: 550;">
    其他说明
</div>

1. 控制不同功能的代码尽量放在了不同的文件里。
2. 其中生成菜单的相关函数向渲染进程发出了消息以控制渲染进程的活动，如打开新文件的操作。渲染进程监听消息的相关代码在***window-action.js***中。
3. 进行改变窗体大小的操作时，由渲染进程向主进程发出消息。主进程监听消息的相关代码在***main.js***中。
4. `npm install something --save-dev` 表示安装某个库以用于开发、调试。
5. `npm install something` 表示软件运行时需要使用安装的库，这个库将打包进最终的软件中。

