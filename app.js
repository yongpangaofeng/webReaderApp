//引入koa node的前端框架
var koa = require('koa');
//引入koa的路由
var controller = require('koa-route');
var app = koa();    
//把views模板返回到浏览器端   views中间件
var views = require('co-views')
var render = views('./view', {
  map: { html: 'ejs' }
});
var koa_static = require('koa-static-server');//静态文件的中间件
//引入server文件，实现接口(app.js)和数据(webAppService传递的json)的对接
var service = require('./service/webAppService.js');
app.use(koa_static({
	rootDir: './static/',//目录：整个工程的目录(整个文件系统的目录)
	rootPath: '/static/',//URL地址:访问静态文件的路径
	maxage: 0 //缓存
}));

app.use(controller.get('/route_test', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = 'Hello koa';
}));

app.use(controller.get('/ejs_test', function*(){//页面
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('test',{title:'title_test'});
}));

app.use(controller.get('/api_test', function*(){//模板
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_test_data();
}));

//首页页面路由
app.use(controller.get('/', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index');
}));
//返回按钮路由
app.use(controller.get('/backet',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('backet');
}));
//书籍页面路由
app.use(controller.get('/book', function*(){
    this.set('Cache-Control', 'no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render('book',{nav:'书籍详情',bookId:bookId});
}));

//搜索页面路由
app.use(controller.get('/search', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('search',{nav:'搜索'});
}));

//分类页面路由
app.use(controller.get('/category', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('category',{nav:'分类页面'});
}));

//女频页面路由
app.use(controller.get('/female', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('female',{nav:'女生频道'});
}));

//男频页面路由
app.use(controller.get('/male', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('male',{nav:'男生频道'});
}));

//排行页面路由
app.use(controller.get('/rank', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('rank',{nav:'排行页面'});
}));
//用户中心路由
app.use(controller.get('/usercenter',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('user-center',{nav:'用户中心'});
}));
//读者路由
app.use(controller.get('/reader',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('reader');
}));

//首页数据接口
app.use(controller.get('/ajax/index', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_index_data();
}));

//书籍数据接口
app.use(controller.get('/ajax/book', function*(){
    this.set('Cache-Control', 'no-cache');
    var querystring = require('querystring');//把一个object对象转换成一个http参数格式
    var params = querystring.parse(this.req._parsedUrl.query);//把http参数解析成一个object参数
    var id = params.id; //因为书籍是用id来找的，所以要到参数中找到id
    if( !id ){  //容错处理
        id = "";    //service中已经设置了id,下面会直接从service中取得id
    }
    this.body = service.get_book_data(id);
}));

//排行数据接口
app.use(controller.get('/ajax/rank', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_rank_data();
}));
//女频数据接口
app.use(controller.get('/ajax/female', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_female_data();
}));
//男频数据接口
app.use(controller.get('/ajax/male', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_male_data();
}));
//分类数据接口
app.use(controller.get('/ajax/category', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));
//书架数据接口
app.use(controller.get('/ajax/bookbacket', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_bookbacket_data();
}));


app.use(controller.get('/ajax/chapter', function*(){
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_chapter_data();
}));

app.use(controller.get('/ajax/chapter_data', function*(){
    this.set('Cache-Control', 'no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if(!id){
       id = "";
    }
    this.body = service.get_chapter_content_data(id);
}));


//搜索本身是一个异步方法用ajax连接后端暴露的接口
app.use(controller.get('/ajax/search', function*(){
    this.set('Cache-Control', 'no-cache');
    
    var querystring = require('querystring');//把一个object对象转换成一个http参数格式
    var params = querystring.parse(this.req._parsedUrl.query);//把http参数解析成一个object参数
    //获得三个参数
    var start = params.start; 
    var end = params.end; 
    var keyword = params.keyword; 
    //搜索本身有三个参数，从上面传递下来
    //用yield 因为搜索是异步的
    this.body = yield service.get_search_data(start,end,keyword);
}));


app.listen(63781);