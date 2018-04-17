//获取加速度信息
//通过监听上一步获取到的x, y, z 值在一定时间范围内的变化率，进行设备是否有进行晃动的判断。
 //而为了防止正常移动的误判，需要给该变化率设置一个合适的临界值。
var speed = 25;
var last_update = 0;
var x, y, z, last_x = 0, last_y = 0, last_z = 0;
var mposition = {
    x: 0,
    y: 0,
    z: 0,
}
var Aspeed = {
    x: 0,
    y: 0,
    z: 0,
}
var nposition = {
    beta: 0,// 设备在Beta方向上旋转的角度, 范围为-180-180
    alpha: 0,// 设备在alpha方向上旋转的角度, 范围为0-360
    gamma: 0,//设备在Gamma方向上旋转的角度, 范围为-90-90
}
var socket = io();
// var onoff = false;
var onoff = false;
var color;
var temp;
var phoneId = new Date().getTime();
$('.getball').on('click',function(){
    onoff = true;
});
$('.ball').on('click',function(){
    color = $(this).css('background-color');
    // socket.emit('myColor',color);
    temp = $(this).index();
    socket.emit('myColor',temp,phoneId);
    console.log(temp);
})
//运动事件监听
if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion',deviceMotionHandler,false);
} else {
  alert("你的设备不支持位置感应");
}

function deviceMotionHandler(eventData) {
    var macceleration =eventData.accelerationIncludingGravity;
    mposition = {
        x: macceleration.x,
        y: macceleration.y,
        z: macceleration.z,
    }
    Aspeed = {
        x: Math.abs(mposition.x - last_x),
        y: Math.abs(mposition.y - last_y),
        z: Math.abs(mposition.z - last_z),
    }
    if(Math.abs(mposition.x - last_x) > speed || Math.abs(mposition.y - last_y) > speed) {
        socket.emit('mshake',Aspeed,phoneId);
    }
    var zxc = Math.abs(mposition.x - last_x);
    var zxcv = Math.abs(mposition.y - last_y);
    last_x = mposition.x;
    last_y = mposition.y;
    last_z = mposition.z;
    $('#q1').html(zxc);
    $('#q2').html(zxcv);
    $('#q3').html(mposition.x - last_x);
 }