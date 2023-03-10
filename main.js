document.addEventListener("DOMContentLoaded", function (event) {

    var text_menu = document.querySelector('.text_menu');
    var canvas_menu = document.querySelector('.canvas_menu');

    var focus_img ;
    var focus_textarea ;

    var focus_textarea_select_s ;
    var focus_textarea_select_e ;




    /*關閉畫面的右鍵*/
    // document.addEventListener('contextmenu', function(e){
    //     e.preventDefault();
    //     return
    // }, false);


    // var img_0 = document.getElementsByTagName("input");
    // var img_l =[];
    // for(var i = 0; i < img_0.length; i++) {
    //     if(img_0[i].type.toLowerCase() == 'image') {
    //         img_l.push(img_0[i])
    //     }
    // }
    var time_out;
    clearTimeout(time_out);
    var img_l = document.getElementsByTagName("img");

    for (var index = 0; index < img_l.length; index++) {
        var element = img_l[index];
        if(element.getAttribute("jag-type") == "signat"){
            element.classList.add('bg_glay')
            element.addEventListener('click', function(e){
                focus_img = e.currentTarget;

                show_signat();


            }, false);

        }else{

            // element.addEventListener('contextmenu', function(e){
            // element.addEventListener('dblclick', function(e){
            //     focus_img = e.currentTarget;
            //     onContextMenu(e, canvas_menu)
            // }, false);

            element.addEventListener('mousedown', function(e){
                time_out = setTimeout(function(){
                    focus_img = e.target;
                    onContextMenu(e, canvas_menu);
                }, 500);
            }, false);
            element.addEventListener('mouseup', function(e){
                clearTimeout(time_out);

            }, false);

            var box_div = element.parentNode;
            box_div.style.position = "relative"
            box_div.style.width = element.width + "px";
            box_div.style.height = element.height + "px";




        }

        
    }




    var TEXTAREA_l = document.getElementsByTagName("TEXTAREA");
    for (var index = 0; index < TEXTAREA_l.length; index++) {
        var element = TEXTAREA_l[index];
        element.addEventListener('contextmenu', function(e){
            focus_textarea = e.currentTarget;
            focus_textarea_select_s = e.currentTarget.selectionStart;
            focus_textarea_select_e = e.currentTarget.selectionEnd;

            onContextMenu(e, text_menu)
        }, false);
    }
    function onContextMenu(e, menu_doc){
        e.preventDefault();
        showMenu(e.pageX, e.pageY, menu_doc);
        // document.addEventListener('mousedown', onMouseDown, false);
        main_form.addEventListener('click', onMouseDown, false);
    }


    function showMenu(x, y, menu_doc){
        menu_doc.style.left = x + 'px';
        menu_doc.style.top = y + 'px';
        menu_doc.classList.add('menu-show');
    }

    function hideMenu(){
        text_menu.classList.remove('menu-show');
        canvas_menu.classList.remove('menu-show');
    }



    function onMouseDown(e){

        hideMenu();
        // document.removeEventListener('mousedown', onMouseDown);
        main_form.removeEventListener('click', onMouseDown);
    }


    var btn_input_txt_l = document.getElementsByClassName('input_txt');
    for (var index = 0; index < btn_input_txt_l.length; index++) {
        var element = btn_input_txt_l[index];
        // element.addEventListener("mousedown", intxt);
        element.addEventListener("click", intxt);
    }

    function intxt(e){
        // console.log(e.currentTarget.getAttribute("data-txt"));
        if( e.currentTarget.getAttribute("data-txt")== null){
            e.stopPropagation();
            return
        }

        var str  = focus_textarea.value;

        // focus_textarea.value +=  e.currentTarget.getAttribute("data-txt");
        focus_textarea.value =  str.substring(0, focus_textarea_select_s) + e.currentTarget.getAttribute("data-txt") + str.substring(focus_textarea_select_e)
        // e.stopPropagation();
    }



    var btn_input_img = document.getElementsByClassName('input_img')[0];
    btn_input_img.addEventListener("change", readURL, false);

    function readURL(input) {
        onMouseDown();
        input = input.currentTarget;
        var group_name = focus_img.name.split("_")[0];
        var back_img = document.getElementsByName(group_name+"_back")[0]

        var new_size = back_img.width /back_img.height;
        if (input.files && input.files[0]) {
            var reader = new FileReader();

    
            reader.onload = function (e) {
                // back_img.setAttribute('src', e.target.result);

                const inputImage = new Image();
                inputImage.src = e.target.result;


                inputImage.onload = function () {
                    const inputWidth = inputImage.naturalWidth;
                    const inputHeight = inputImage.naturalHeight;
        
                    const inputImageAspectRatio = inputWidth / inputHeight;


                    let outputWidth = inputWidth;
                    let outputHeight = inputHeight;

                    if(inputImageAspectRatio > new_size){
                        outputWidth = inputHeight * new_size;
                    }else{
                        outputHeight = inputWidth / new_size;
        
                    }

                    const outputX = (outputWidth - inputWidth) * .5;
                    const outputY = (outputHeight - inputHeight) * .5;



                    const outputImage = document.createElement('canvas');

                    // set it to the same size as the image
                    outputImage.width = outputWidth;
                    outputImage.height = outputHeight;


                    const ctx = outputImage.getContext('2d');

                    ctx.drawImage(inputImage, outputX, outputY);

                    const dataURL = outputImage.toDataURL('image/jpeg');
                    back_img.setAttribute('src', dataURL);
                };


            };
            reader.readAsDataURL(input.files[0]);
        }
    }




    var btn_openCanvas = document.getElementsByClassName('open_canvas')[0];
    btn_openCanvas.addEventListener("click", open_canvas, false);

    function open_canvas(e){
        onMouseDown();
        var group_name = focus_img.name.split("_")[0];
        var back_img = document.getElementsByName(group_name+"_back")[0]
        var front_img = document.getElementsByName(group_name+"_front")[0]

        // var mask_img = document.getElementsByName(back_name)[0];
        // console.log(mask_img);
        drag_box.style.width = back_img.width + "px";
        drag_box.style.height = back_img.height + "px";
        // drag_box.style.backgroundImage = "url("+back_img.src+")";
        drag_box.getElementsByClassName("drag_bg")[0].src = back_img.src;
      

        

        canvas.width = front_img.width;  //設定canvas的寬
        canvas.height = front_img.height;  //設定canvas的高

        canvas_cursor.width = front_img.width;  //設定canvas的寬
        canvas_cursor.height = front_img.height;  //設定canvas的高

        ctx.clearRect(0, 0, canvas.width, canvas.height);



        var img = new Image();
        img.src= front_img.src;
        img.onload = function(){
            ctx.drawImage(this, 0, 0, front_img.width, front_img.height) ;
            // snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
            takeSnapShot();
        }


        document.getElementsByClassName("canvas_box")[0].classList.add('menu-show');

        // snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        takeSnapShot();

        document.getElementsByTagName("body")[0].classList.add("drog");
        document.getElementsByTagName("html")[0].classList.add("drog");

   
    }


    

    var canvas = document.getElementById('cvs');
    var ctx = canvas.getContext('2d');

    var canvas_cursor = document.getElementById('cvs_cursor');
    var ctx_cursor = canvas_cursor.getContext('2d');

    var drag_box = document.getElementsByClassName("drag_box")[0];



    var mark_size = 20;

    var dragStartLocation;
    var dragging = false;

    var snapshot;

  



    canvas.addEventListener("mousedown", drawTrue, false);
    // canvas.addEventListener("click", function(){return false;}, false);
    canvas.addEventListener("mouseup", drawFalse, false);
    canvas.addEventListener("mousemove", draw, false);
    canvas.addEventListener("mouseout", drawOut, false);


    document.getElementById('lineWidth').addEventListener('input', changeLineWidth, false);
    function changeLineWidth() {
        // radius = this.value;
    }
    var btn_line_width = document.getElementsByClassName('line_button');
    for (var index = 0; index < btn_line_width.length; index++) {
        var element = btn_line_width[index];
        element.addEventListener("click", change_lineWidth);
    }
    function change_lineWidth(event){
        lineWidth.value = event.currentTarget.getAttribute("data-width")
    }

    document.getElementById('markWidth').addEventListener('input', changMarkkWidth, false);
    function changMarkkWidth() {
        // mark_size = this.value;
    }
    var btn_size_button = document.getElementsByClassName('size_button');
    for (var index = 0; index < btn_size_button.length; index++) {
        var element = btn_size_button[index];
        element.addEventListener("click", change_sizeWidth);
    }
    function change_sizeWidth(event){
        markWidth.value = event.currentTarget.getAttribute("data-width")
    }

    document.getElementById('fillColor').addEventListener('input', changeFillStyle, false);
    function changeFillStyle() {
        // event.stopPropagation();
    }
    var btn_line_color = document.getElementsByClassName('color_button');
    for (var index = 0; index < btn_line_color.length; index++) {
        var element = btn_line_color[index];
        element.addEventListener("click", change_fill_color);
    }
    function change_fill_color(event){
        fillColor.value = event.currentTarget.getAttribute("data-color");
    }


    document.getElementById('input_txt').addEventListener('input', changText, false);
    function changText() {
        document.getElementById("drag_text").checked = true;
    }


    

    var all_shape = document.getElementsByName('shape');
    for (var index = 0; index < all_shape.length; index++) {
        var element = all_shape[index];
        element.addEventListener("click", change_shape);
    }
    function change_shape(event) {
        change_temp(event.currentTarget.id);
    }
    change_temp("drag_pen");

    function change_temp(shape){
        switch (shape) {
            case 'drag_pen':
                show_hide_type(true, false, false, true);
                break;
            case 'drag_eraser':
                show_hide_type(false, true, false, false);
                break;
            case 'drag_line':
                show_hide_type(true, false, false, true);
                break;
            case 'drag_arrow':
                show_hide_type(true, true, false, true);
                break;
            case 'drag_spray':
                show_hide_type(false, true, false, true);
                break;
            case 'drag_cross':
                show_hide_type(true, true, false, true);
                break;
            case 'drag_plus':
                show_hide_type(true, true, false, true);
                break;
            case 'drag_circle_s':
                show_hide_type(true, true, false, true);
                break;
            case 'drag_circle_f':
                show_hide_type(false, true, false, true);
                break;
            case 'drag_star_s':
                show_hide_type(true, true, false, true);
                break;
            case 'drag_star_f':
                show_hide_type(false, true, false, true);
                break;
            case 'drag_text':
                show_hide_type(false, true, true, true);
                break;
        }
    }

    function show_hide_type(width, size, text, color){
        if(width){
            width_type.style.display = 'block';
        }else{
            width_type.style.display = 'none';
        }
        if(size){
            size_type.style.display = 'block';
        }else{
            size_type.style.display = 'none';
        }
        if(text){
            text_type.style.display = 'block';
        }else{
            text_type.style.display = 'none';
        }
        if(color){
            color_type.style.display = 'block';
        }else{
            color_type.style.display = 'none';
        }
    }




    function getPostion(event) {
        var x , y;

        x = event.clientX - canvas.getBoundingClientRect().left;
        y = event.clientY - canvas.getBoundingClientRect().top;

        
        return {x: x, y: y};
    }
    // Check if mouse is down
    function drawTrue(e) {
        dragStartLocation = getPostion(e);
        ctx.moveTo(dragStartLocation.x, dragStartLocation.y);
    

        dragging = true;


        document.getElementsByClassName("canvas_box menu-show")[0].classList.add("drog");

    }





    // Function of drawing
    function draw(e) {
        // alert("draw");
        hide_mouse();
        mark_size = markWidth.value;
        ctx.lineWidth = lineWidth.value ;
        ctx.fillStyle = fillColor.value;
        ctx.strokeStyle = fillColor.value;
        ctx.lineCap = "round";
        ctx.lineJoin='round'; 
   
        ctx.globalCompositeOperation = 'source-over';

        var position = getPostion(e);
        var shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;

        switch (shape) {
            case 'drag_pen':
                if(dragging){
                    drag_pen(position);
                }
                setCursor(position, ctx.lineWidth/2, shape);
                break;
            case 'drag_eraser':
            ctx.lineCap = "square";
            ctx.lineJoin='round'; 
            ctx.globalCompositeOperation = 'destination-out';
                if(dragging){
                    drag_eraser(position, mark_size);
                }
                setCursor(position, mark_size, shape);
                break;
            case 'drag_line':
                if(dragging){
                    drag_line(position);
                }
                show_mouse();
                break;
            case 'drag_arrow':
                if(dragging){
                    drag_arrow(position)
                }
                show_mouse();
                break;
            case 'drag_spray':
                if(dragging){
                    drag_spray(position);
                }
                setCursor(position, mark_size, shape);
                break;
            case 'drag_cross':
                drag_cross(position);
                show_mouse();
                break;
            case 'drag_plus':
                drag_plus(position);
                show_mouse();
                break;
            case 'drag_circle_s':
                drag_circle_s(position);
                show_mouse();
                break;
            case 'drag_circle_f':
                drag_circle_f(position);
                show_mouse();
                break;
            case 'drag_star_s':
                drag_star_s(position);
                show_mouse();
                break;
            case 'drag_star_f':
                drag_star_f(position);
                show_mouse();
                break;

            case 'drag_text':
                drag_text(position);
                show_mouse();
                break;
            default:
                show_mouse();

        }
        // ctx.beginPath();
        // takeSnapShot() ;
        return ;
    }
    function drawFalse() {
        // alert("drawFalse");
        dragging = false;
        // ctx.closePath();
        ctx.beginPath();
        takeSnapShot();
        var position = getPostion(event);
        draw(position);

        document.getElementsByClassName("canvas_box menu-show")[0].classList.remove("drog");
    }
    function drawOut() {
        dragging = false;
        restoreSnapShot();
        ctx.beginPath();
        document.getElementsByClassName("canvas_box menu-show")[0].classList.remove("drog");
        ctx_cursor.clearRect(0, 0, canvas.width, canvas.height);
    }


    function setCursor(position, size, type){

        ctx_cursor.clearRect(0, 0, canvas.width, canvas.height);
        ctx_cursor.lineWidth = 1;
        ctx_cursor.setLineDash([1]);

        switch (type) {
            case 'drag_pen':
            ctx_cursor.arc( position.x, position.y, size, 0, Math.PI * 2 ,true);
            ctx_cursor.fillStyle = fillColor.value;
            ctx_cursor.fill();
            break;
            case 'drag_eraser':
            ctx_cursor.rect(position.x - size, position.y - size, size*2, size*2);
                break;
            case 'drag_spray':
            ctx_cursor.arc( position.x, position.y, size, 0, Math.PI * 2 ,true);
                break;
        }


        ctx_cursor.stroke();
        ctx_cursor.beginPath();

    }
    function hide_mouse(){
        canvas.classList.add('cursor_none');
    }
    function show_mouse(){
        canvas.classList.remove('cursor_none');
    }

    function drag_pen(position) {
        restoreSnapShot();
        ctx.lineTo(position.x, position.y);
        ctx.stroke();
        takeSnapShot();

    }
    function drag_eraser(position, size) {
        restoreSnapShot();
        ctx.beginPath();
        ctx.rect(position.x - size, position.y - size, size*2, size*2);
        // ctx.arc( position.x, position.y, mark_size, 0, Math.PI * 2,true);
        ctx.fill();
        takeSnapShot();

    }
    function drag_line(position) {
        restoreSnapShot();
        ctx.beginPath();
        ctx.moveTo(dragStartLocation.x, dragStartLocation.y);
        ctx.lineTo(position.x, position.y);


        ctx.stroke();


    }
    function drag_arrow(position) {
        restoreSnapShot();
        ctx.beginPath();
        ctx.moveTo(dragStartLocation.x, dragStartLocation.y);
        ctx.lineTo(position.x, position.y);

        var nowAng = Math.atan2(position.y -dragStartLocation.y , position.x -dragStartLocation.x) *180 /Math.PI;

        ctx.moveTo(position.x, position.y); 
        ctx.lineTo(Math.cos((nowAng-135)/180*Math.PI)*mark_size+position.x, Math.sin((nowAng-135)/180*Math.PI)*mark_size+position.y); 
        ctx.moveTo(position.x, position.y); 
        ctx.lineTo(Math.cos((nowAng+135)/180*Math.PI)*mark_size+position.x, Math.sin((nowAng+135)/180*Math.PI)*mark_size+position.y); 

        ctx.stroke();
    }
    function drag_spray(position) {
        var  randomX, randomY;

        for (var i=0;i < mark_size/2;i++) {
            randomX = Math.cos(Math.random()*360/180*Math.PI)*mark_size*Math.random()+position.x;
            randomY = Math.sin(Math.random()*360/180*Math.PI)*mark_size*Math.random()+position.y;

            ctx.beginPath();
            ctx.arc( randomX, randomY, 1, 0, Math.PI * 2,true);
            ctx.fill();
        }

        takeSnapShot();

    }
    function drag_cross(position) {
        restoreSnapShot();
        ctx.beginPath();
        ctx.moveTo(Math.cos((45)/180*Math.PI)*mark_size+position.x, Math.sin((45)/180*Math.PI)*mark_size+position.y); 
        ctx.lineTo(Math.cos((-135)/180*Math.PI)*mark_size+position.x, Math.sin((-135)/180*Math.PI)*mark_size+position.y); 
        ctx.moveTo(Math.cos((-45)/180*Math.PI)*mark_size+position.x, Math.sin((-45)/180*Math.PI)*mark_size+position.y); 
        ctx.lineTo(Math.cos((135)/180*Math.PI)*mark_size+position.x, Math.sin((135)/180*Math.PI)*mark_size+position.y);
        ctx.stroke();
    }
    function drag_plus(position) {
        restoreSnapShot();
        ctx.beginPath();
        ctx.moveTo(Math.cos((0)/180*Math.PI)*mark_size+position.x, Math.sin((0)/180*Math.PI)*mark_size+position.y); 
        ctx.lineTo(Math.cos((180)/180*Math.PI)*mark_size+position.x, Math.sin((180)/180*Math.PI)*mark_size+position.y); 
        ctx.moveTo(Math.cos((-90)/180*Math.PI)*mark_size+position.x, Math.sin((-90)/180*Math.PI)*mark_size+position.y); 
        ctx.lineTo(Math.cos((90)/180*Math.PI)*mark_size+position.x, Math.sin((90)/180*Math.PI)*mark_size+position.y);
        
        ctx.stroke();
    }

    function drag_circle_s(position) {
        restoreSnapShot();
        ctx.beginPath();
        ctx.arc( position.x, position.y, mark_size, 0, Math.PI * 2 ,true);
        ctx.stroke();
    }
    function drag_circle_f(position) {
        restoreSnapShot();
        ctx.beginPath();
        ctx.arc( position.x, position.y, mark_size, 0, Math.PI * 2,true);
        ctx.fill();
    }
    function drag_star_s(position) {
        restoreSnapShot();
        ctx.beginPath();
        for (var i=0;i < 5;i++) {
            ctx.lineTo(Math.cos((-18+i*72)/180*Math.PI)*mark_size+position.x, Math.sin((-18+i*72)/180*Math.PI)*mark_size+position.y); 
            ctx.lineTo(Math.cos((18+i*72)/180*Math.PI)*mark_size*0.5+position.x, Math.sin((18+i*72)/180*Math.PI)*mark_size*0.5+position.y); 
            ctx.lineTo(Math.cos((54+i*72)/180*Math.PI)*mark_size+position.x, Math.sin((54+i*72)/180*Math.PI)*mark_size+position.y); 
        }

        ctx.stroke();
    }
    function drag_star_f(position) {
        restoreSnapShot();
        ctx.beginPath();
        for (var i=0;i < 5;i++) {
            ctx.lineTo(Math.cos((-18+i*72)/180*Math.PI)*mark_size+position.x, Math.sin((-18+i*72)/180*Math.PI)*mark_size+position.y); 
            ctx.lineTo(Math.cos((18+i*72)/180*Math.PI)*mark_size*0.5+position.x, Math.sin((18+i*72)/180*Math.PI)*mark_size*0.5+position.y); 
            ctx.lineTo(Math.cos((54+i*72)/180*Math.PI)*mark_size+position.x, Math.sin((54+i*72)/180*Math.PI)*mark_size+position.y); 
        }
        ctx.fill();
    }
    function drag_text(position) {
        restoreSnapShot();
        ctx.beginPath();
        ctx.font = mark_size+'px Arial';
        ctx.textAlign = "center"; 
        ctx.textBaseline = "middle"; 
        ctx.fillText( document.getElementById("input_txt").value, position.x, position.y);
    }




    function takeSnapShot() {
        snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

    }
    function restoreSnapShot() {
        ctx.putImageData(snapshot, 0, 0);

    }






    document.getElementById('canvas_cancle').addEventListener('click', cancle_canvas, false);
    document.getElementById('canvas_send').addEventListener('click', canvas_send, false);
    document.getElementById('canvas_clean').addEventListener('click', canvas_clean, false);


    function cancle_canvas(){
        document.getElementsByClassName("canvas_box")[0].classList.remove('menu-show');

        document.getElementsByTagName("body")[0].classList.remove("drog");
        document.getElementsByTagName("html")[0].classList.remove("drog");
    }

    function canvas_send(){
        var group_name = focus_img.name.split("_")[0];
        var front_img = document.getElementsByName(group_name+"_front")[0]

        front_img.src = canvas.toDataURL('image/jpg');
        cancle_canvas();
        // document.getElementsByClassName("canvas_box")[0].classList.remove('menu-show');


    }
    function canvas_clean(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        takeSnapShot();
    }
    
   









    //攝影機
    var btn_openRecode = document.getElementsByClassName('open_recode')[0];
    // btn_openRecode.addEventListener("mousedown", open_recode, false);
    btn_openRecode.addEventListener("click", open_recode, false);

    function open_recode(e){
        onMouseDown();
        document.getElementsByClassName("video_box")[0].classList.add('menu-show');


        const videoElement = document.getElementById("inputVideo");
        const videoSelect = document.querySelector('select#videoSource');

        videoSelect.innerText  = "";



        navigator.mediaDevices.enumerateDevices()
          .then(gotDevices).then(getStream).catch(handleError);
        
        videoSelect.onchange = getStream;
        
        function gotDevices(deviceInfos) {

            console.log(deviceInfos);
          for (let i = 0; i !== deviceInfos.length; ++i) {
            const deviceInfo = deviceInfos[i];
            const option = document.createElement('option');
            option.value = deviceInfo.deviceId;
            if (deviceInfo.kind === 'videoinput') {
              option.text = deviceInfo.label || 'camera ' +
                (videoSelect.length + 1);
              videoSelect.appendChild(option);
            }



          }
        }
        
        function getStream() {
          if (window.stream) {
            window.stream.getTracks().forEach(function(track) {
              track.stop();
            });
          }

            var orientation ="";
            if(window.screen.orientation.type == "landscape-primary" || window.screen.orientation.type == "landscape-secondary"){
                orientation = "landscape"
            }else{
                orientation = "portrait"
            }

        
          var group_name = focus_img.name.split("_")[0];
          var back_img = document.getElementsByName(group_name+"_back")[0];

          var new_size = back_img.width /back_img.height;

        if(orientation == "landscape"){
            // new_size = back_img.width /back_img.height;
        }else{
            // new_size = back_img.height / back_img.widt;
            new_size = 1 / new_size;
        }

          const constraints = {
            video: {
                deviceId: {exact: videoSelect.value},
                aspectRatio: new_size,
                // width: 200,
                // height: 100,
            }
          };
        
          navigator.mediaDevices.getUserMedia(constraints).
            then(gotStream).catch(handleError);
        }
        
        function gotStream(stream) {


            // var group_name = focus_img.name.split("_")[0];
            // var back_img = document.getElementsByName(group_name+"_back")[0];
            // var new_size = back_img.width /back_img.height;
            // console.log(new_size);

            // var track  =stream.getVideoTracks()[0];
            // // alert( JSON.stringify( track.getSettings()));
            // var track_w;
            // var track_h;
            // if(orientation == "landscape"){
            //     track_w = track.getSettings().width;
            //     track_h = track.getSettings().height;
            // }else{
            //     track_h = track.getSettings().width;
            //     track_w = track.getSettings().height;
            // }

            // console.log(track_w / track_h);
            // if(new_size > track_w / track_h){
            //     track_h = track_w /new_size;
            // }else{
            //     track_w = track_h * new_size;
            // }
            // var constraints = {};
            // if(orientation == "landscape"){
            //     constraints = {
            //         width: track_w,
            //         height: track_h,
            //     };
            // }else{
            //     constraints = {
            //         width: track_h,
            //         height: track_w,
            //     };
            // }
            // const constraints = {
            //     width: track_w,
            //     height: track_h,
            // };
            // inputVideo.width = track_w;
            // inputVideo.height = track_h;

            // alert(JSON.stringify(constraints));
            

            // track.applyConstraints(constraints);

            window.stream = stream; // make stream available to console
            videoElement.srcObject = stream;



            inputVideo.setAttribute('autoplay', true);
            inputVideo.srcObject = stream;
  
            // inputVideoURL = URL.createObjectURL(stream)
            // inputVideo.src = inputVideoURL
            inputVideo.controls = false       // 要不要顯示播放控制器
        }
        
        function handleError(error) {
          console.error('Error: ', error);
        }





        return false;



        // e.stopPropagation();
    }
    document.getElementById('cam_cancle').addEventListener('click', cam_cancle, false);
    document.getElementById('cam_send').addEventListener('click', cam_send, false);
    function cam_cancle(){
        document.getElementsByClassName("video_box")[0].classList.remove('menu-show');

        camera_stop();

    }
    function cam_send(){
        var cam_video = document.getElementById("inputVideo");

        
        var canvas = document.createElement("canvas");
        var context = canvas.getContext('2d');


        console.log(cam_video.videoWidth, cam_video.videoHeight)

        canvas.width = cam_video.videoWidth;  // 640
        canvas.height = cam_video.videoHeight;  //480




        context.drawImage(cam_video, 0, 0, canvas.width, canvas.height);
        // context.drawImage(cam_video, -138.5, 0, 640, 480);

        //截圖
        var dataURL = canvas.toDataURL('image/jpeg');

        var group_name = focus_img.name.split("_")[0];
        var back_img = document.getElementsByName(group_name+"_back")[0]
        back_img.setAttribute('src', dataURL);

        document.getElementsByClassName("video_box")[0].classList.remove('menu-show');

        camera_stop();
    }

    function camera_stop(){
        var cam_video = document.getElementById("inputVideo");
        var stream = cam_video.srcObject;
        var tracks = stream.getTracks();
        console.log(tracks);
        for (var i = 0; i < tracks.length; i++) {
          var track = tracks[i];
          track.stop();
        }
      
        cam_video.srcObject = null;
    }
    

    
    var btn_openTree = document.getElementsByClassName('open_tree')[0];
    btn_openTree.addEventListener("click", open_tree, false);

    function open_tree(e){
        onMouseDown();

        document.getElementsByClassName("tree_box")[0].classList.add('menu-show');
        document.getElementsByTagName("body")[0].classList.add("drog");

        console.log('btn_openTree');
        // var dom_iframe = document.createElement("iframe");
        var dom_iframe = document.getElementById('iframe_tree');
        // dom_iframe.src = 'https://test.healthplusiot.com/form/tree_mode/familytree/FamilyTree.html';
        dom_iframe.src = 'http://192.168.1.95:5500/familytree/FamilyTree.html';

        // document.getElementsByClassName("tree_box")[0].appendChild(dom_iframe);
    }
    document.getElementById('tree_cancle').addEventListener('click', tree_cancle, false);
    document.getElementById('tree_send').addEventListener('click', tree_send, false);
    function tree_cancle(){
        //關閉畫面
        document.getElementsByClassName("tree_box")[0].classList.remove('menu-show');
        document.getElementsByTagName("body")[0].classList.remove("drog");

        var dom_iframe = document.getElementById('iframe_tree');
        dom_iframe.src = '';
    }
    function tree_send(){
        document.getElementById('iframe_tree').contentWindow.postMessage('save_pic', '*');
    }

    function bindEvent(element, eventName, eventHandler) {
        if (element.addEventListener){
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, eventHandler);
        }
    }
    bindEvent(window, 'message', function (e) {


        var dataURL = e.data;

        var group_name = focus_img.name.split("_")[0];
        var back_img = document.getElementsByName(group_name+"_back")[0]
        back_img.setAttribute('src', dataURL);

        tree_cancle();

        
    })




    var signat_canvas = document.getElementById('signat');
    var signat_contex = signat_canvas.getContext('2d');
    var signat_drag_box = document.getElementsByClassName("signat_drag_box")[0];

    

    function show_signat(){

        document.getElementsByClassName("signat_box")[0].classList.add('menu-show');
        document.getElementsByTagName("body")[0].classList.add("drog");

        signat_canvas.width = 500;  //設定canvas的寬
        signat_canvas.height = 500 * (focus_img.height / focus_img.width)  ;  //設定canvas的高

        
        signat_drag_box.style.width = signat_canvas.width + "px";
        signat_drag_box.style.height = signat_canvas.height + "px";

        
        signat_contex.clearRect(0, 0, signat_canvas.width, signat_canvas.height);
        var img = new Image();
        img.src= focus_img.src;
        img.onload = function(){
            signat_contex.drawImage(this, 0, 0, signat_canvas.width, signat_canvas.height) ;

          
        }
       

        signat_canvas.addEventListener("mousedown", function(e){
            dragging = true;
            signat_contex.moveTo(e.offsetX, e.offsetY);

            signat_contex.lineCap = "round";
            signat_contex.lineJoin='round'; 
            signat_contex.lineWidth = 3;
            signat_contex.beginPath();

        }, false);
        signat_canvas.addEventListener("mouseup", function(e){
            dragging = false;
            signat_contex.beginPath();

        }, false);

        signat_canvas.addEventListener("mousemove", function(e){

            if(dragging){

                signat_contex.lineTo(e.offsetX, e.offsetY);
                signat_contex.stroke();
                


            }
        }, false);
    }
    document.getElementById('signat_cancle').addEventListener('click', signat_cancle, false);
    document.getElementById('signat_send').addEventListener('click', signat_send, false);
    document.getElementById('signat_clean').addEventListener('click', signat_clean, false);


    function signat_cancle(){
        document.getElementsByClassName("signat_box")[0].classList.remove('menu-show');

        document.getElementsByTagName("body")[0].classList.remove("drog");
    }

    function signat_send(){

        focus_img.src = signat_canvas.toDataURL('image/jpg');
        signat_cancle();

    }
    function signat_clean(){
        signat_contex.clearRect(0, 0, signat_canvas.width, signat_canvas.height);

    }
    





    var main_form = document.getElementById("main_form");

    var btn_save = document.getElementById("save_data");
    // var btn_load = document.getElementById("load_data");
    // var btn_clean = document.getElementById("clean_data");



    btn_save.addEventListener("click", function(){
        
        var new_obj= {
            value_textarea : [],
            value_input_value: [],
            value_input_checked: [],
            value_select: [],
            value_img: [],

        }

        // 文字框
        var all_textarea = main_form.getElementsByTagName("textarea");
        for (var i = 0; i < all_textarea.length; i++) {
            new_obj.value_textarea.push(all_textarea[i].value);
        }

        //INPUT
        var all_input = main_form.getElementsByTagName("input");
        for (var i = 0; i < all_input.length; i++) {
            new_obj.value_input_value.push(all_input[i].value);
            new_obj.value_input_checked.push(all_input[i].checked);
        }

        //select
        var all_select = main_form.getElementsByTagName("select");
        for (var i = 0; i < all_select.length; i++) {
            new_obj.value_select.push(all_select[i].value);
        }

        //img
        var all_img = main_form.getElementsByTagName("img");
        for (var i = 0; i < all_img.length; i++) {
            new_obj.value_img.push(all_img[i].src);
        }


        localStorage.removeItem(page_id)
        localStorage.setItem(page_id, JSON.stringify(new_obj));

        window.history.back()　


    }, false);
    // btn_load.addEventListener("click", function(){
    //     load_localStorage();
    // }, false);
    load_localStorage();
    function load_localStorage(){
        if(localStorage.getItem(page_id) == null || localStorage.getItem(page_id) ==""){
            // alert('no_save');
            return false;
        }
        var new_obj= JSON.parse(localStorage.getItem(page_id) );
        console.log(new_obj);

        var all_textarea = main_form.getElementsByTagName("textarea");
        for (var i = 0; i < all_textarea.length; i++) {
            all_textarea[i].value = new_obj.value_textarea[i];
        }

        var all_input = main_form.getElementsByTagName("input");
        for (var i = 0; i < all_input.length; i++) {
            all_input[i].value = new_obj.value_input_value[i];
            all_input[i].checked = new_obj.value_input_checked[i];
        }

        var all_select = main_form.getElementsByTagName("select");
        for (var i = 0; i < all_select.length; i++) {
            all_select[i].value = new_obj.value_select[i]
        }

        var all_img = main_form.getElementsByTagName("img");
        for (var i = 0; i < all_img.length; i++) {
            all_img[i].src = new_obj.value_img[i]
        }

    }

    // btn_clean.addEventListener("click", function(){
    //     localStorage.removeItem(page_id)
    // }, false);



    get_sess_data();


    var back = document.getElementById("back");
    back.addEventListener("click", function(){
        window.history.back()　

    }, false);


});



var mouseEventTypes = {
    touchstart : "mousedown",
    touchmove : "mousemove",
    touchend : "mouseup"
};
for (originalType in mouseEventTypes) {
    document.addEventListener(originalType, function(originalEvent) {
        event = document.createEvent("MouseEvents");
        touch = originalEvent.changedTouches[0];
        event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true,
                window, 0, touch.screenX, touch.screenY, touch.clientX,
                touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey,
                touch.metaKey, 0, null);
        originalEvent.target.dispatchEvent(event);
    });
}


