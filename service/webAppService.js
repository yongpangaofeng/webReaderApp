//不直接提供数据，起到转换数据为json格式传到客户端
var fs = require('fs');
exports.get_test_data = function(){
    var content = fs.readFileSync('./mock/test.json','utf-8');
    return content;
}

//书籍数据
exports.get_book_data = function(id){
//  var content = fs.readFileSync('./mock/book/'+ id +'.json','utf-8');
    if( !id ){  //容错处理
        id = "18218";
    }
    if( fs.existsSync('./mock/book/' + id + '.json')){
        return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
    }else{
        return fs.readFileSync('./mock/book/18218.json', 'utf-8');
    }
}
exports.get_chapter_data = function(id){
    var content = fs.readFileSync('./mock/reader/chapter.json','utf-8');
    return content;
}
//
exports.get_chapter_content_data = function(id){
    if( !id ){  //容错处理
        id = "1";
    }
    var content = fs.readFileSync('./mock/reader/data/data'+ id +'.json','utf-8');
    return content;
}
//首页数据
exports.get_index_data = function(){
    var content = fs.readFileSync('./mock/home.json','utf-8');
    return content;
}
//排行数据
exports.get_rank_data = function(){
    var content = fs.readFileSync('./mock/rank.json','utf-8');
    return content;
}
//女频数据
exports.get_female_data = function(){
    var content = fs.readFileSync('./mock/channel/female.json','utf-8');
    return content;
}
//男频数据
exports.get_male_data = function(){
    var content = fs.readFileSync('./mock/channel/male.json','utf-8');
    return content;
}

//分类数据
exports.get_category_data = function(){
    var content = fs.readFileSync('./mock/category.json','utf-8');
    return content;
}
//书架数据
exports.get_bookbacket_data = function(){
    var content = fs.readFileSync('./mock/bookbacket.json','utf-8');
    return content;
}
//线上http搜索接口的方法
exports.get_search_data = function(start,end,keyword){
    return function(cb){    //当接受到回调时，才会返回这个数据
        var http = require('http'); //发送请求
        var qs = require('querystring');  //把一个object对象转换成一个http参数格式
        //{a:'1'} http://127.0.0.1/api?a=1
        var data = {    //后端接收的参数
            s:keyword,
            start:start,
            end:end
        };
        //下面指定发送的接口的地址、端口、路径、方法
        var content = qs.stringify(data);//把数据格式转换成http参数格式
        var http_request = {
            hostname: 'dushu.xiaomi.com',   //主机的地址
            port:80,    //端口
            path:'/store/v0/lib/query/onebox?' + content,    //接口路由的位置
            method:'GET'
        }
        //发送请求request
        var content = qs.stringify(data);//返回的内容保存
        req_obj = http.request(http_request,function(_res){
            var content = '';   //返回的内容保存
            var callback_content = '';
            var _this = this;
            _res.setEncoding('utf8');   //返回的数据格式
            
            _res.on('data',function(chunk){ //事件监听，后端数据分块返回
                content += chunk;  
            });
            _res.on('end',function(e){   //触发end事件的时候，数据才会完全返回，然后返回callback方法
               cb(null,content); //callback(err,content),没有错误返回null,第二个参数返回内容
            });
        });
        req_obj.on('error',function(){
           //响应出错的情况 
        });
        req_obj.end();//发送请求
        
    }
}
