# video-player 

![Pretend that our project has passed the test](https://raw.githubusercontent.com/dwyl/repo-badges/master/highresPNGs/build-passing.png)

# NQ和ZY的临时命名规范

[force] 命名不使用缩写(紫嫣女士说不能用拼音)

[force] 使用4个空格作为缩进, 如

    switch(a) {
        case('2'):
            break;
        default:
            a += '2';
    }

[force] 函数以动词开始, 小写驼峰式命名, 如 getElementById

[force] 变量全小写, 下划线隔开, 如 this_is_a_variable

[force] 类名和枚举名使用大写驼峰式命名, 如 ThisIsClass

[force] 数据常量使用全大写命名, 用下划线分隔开, 如 INITIAL_VALUE

[force] 换行可以在',',';'后, 如 

    function thisIsALongFunction(longInput1, 
        longInput2){
        // do something here
    }

    let functionA = function(param1, [
        1,
        2,
        3,
    ], false);

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