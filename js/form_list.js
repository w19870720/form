document.addEventListener("DOMContentLoaded", function (event) {
    window.sessionStorage.setItem('name', '陳大文');
    window.sessionStorage.setItem('pid', '339445043');
    window.sessionStorage.setItem('sex', '男');
    window.sessionStorage.setItem('birthday', '19200609');
    window.sessionStorage.setItem('did', '王醫生');
   

    // 如果url後面有帶參數'?'
    var url = decodeURI(location.href);

    if(url.indexOf('?') != -1){
        var arr = url.split('?')[1].split('&');

        
        arr.forEach(function(item) {
            var [title, content] = item.split('=');
            window.sessionStorage.setItem(title, content);

            // 塞到表單
            if(title == 'name') {
                var sub_name = content.trim().split('');

                if(sub_name.length < 2) {
                    sub_name = content;
                }
                
                if(sub_name.length < 3) {
                    sub_name[1] = 'O';
                }else {
                    var end = sub_name.length - 1;
                    for(var i = 1; i<end ; i++) {
                        sub_name[i] = 'O';
                    }
                }
                 sub_name = sub_name.join('');

                 var name_div = document.getElementsByClassName('name');
                 for (var i = 0;i<name_div.length;i++) {

                    name_div[i].textContent = sub_name
                };
            }else {
                var div = document.getElementsByClassName(title);
                for (var i = 0;i<div.length;i++) {
                    div[i].textContent = content;
                };
            }
            
        }) 
    }
        

    document.getElementById('clean').addEventListener("click",function(){

        localStorage.clear();
    })

});

