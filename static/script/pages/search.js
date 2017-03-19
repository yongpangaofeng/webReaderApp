//new Vue({
//  el: '#app_search',
//  data: {
//      search:[],
//      condition:true,
//      empty:false
//  },
//  methods: {
//      doSearch: function(e) {
//          var keyword = $('#search_box').val();
//          var _this = this;
//          $.get('/ajax/search',{
//              keyword:keyword
//          },function(d){
//              _this.condition = false;
//              _this.search = d.items;
//              if(_this.search.length == 0){
//                  _this.empty = true;
//              }else{
//                  _this.empty = false;
//              }
//          },'json')
//      }
//  }
//});
$.get('/ajax/search',function(d){
    var windowWidth = $(window).width();
    if(windowWidth<320){
        windowWidth = 320;
    }
    new Vue({
        el:'#app_search',
        data:{  //data内定义属性，变量
            search:[],
        condition:true,
        empty:false,
            screen_width:windowWidth,
            double_screen_width:windowWidth*2,
            duration:0,
            position:0,
            header_position:0,
            header_duration:0,
            tab_1_class:'Swipe-tab__on',
            tab_2_class:''
        },
            methods: {
        doSearch: function(e) {
            var keyword = $('#search_box').val();
            var _this = this;
            $.get('/ajax/search',{
                keyword:keyword
            },function(d){
                _this.condition = false;
                _this.search = d.items;
                if(_this.search.length == 0){
                    _this.empty = true;
                }else{
                    _this.empty = false;
                }
            },'json')
        }
    }
    })
},'json')
