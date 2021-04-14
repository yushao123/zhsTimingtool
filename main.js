"ui";

//设置
var flash = 1   //刷新时间

//init
//124 VIBRATE	允许程序振动
auto("fast")
runtime.requestPermissions(["VIBRATE","ACTION_MANAGE_OVERLAY_PERMISSION"])
var maxtime = 0
var f_Window
var startTime
var selfname = currentPackage()
var x,y
var zhspgname = "com.able.wisdomtree"

function alarm(){
    //振动反馈
    device.vibrate(200);
    sleep(300);
    device.vibrate(200);
}

//关键函数
function LtimeTostr(seconds){
    //秒到 分钟:秒
    var mins = Math.floor(seconds / 60)
    var second = seconds % 60
    var ten = Math.floor(second / 10)
    var one = second % 10
    return mins.toString() + ":" + ten.toString() + one.toString()
}

function ConfirmTime(){
    //循环判断 本来希望在另一个线程 没有多家改变
    var nowtime = new Date().getTime()
    var watchtime = (nowtime - startTime)/1000
    while(watchtime < maxtime){
        if(id("play").text("继续播放").exists()){
            id("play").text("继续播放").findOne().click()
        }
        ui.run(function(){f_Window.text.setText(LtimeTostr(Math.floor(watchtime)))})
        nowtime = new Date().getTime()
        watchtime = (nowtime - startTime) / 1000
        if (text("关闭").exists()) {
            f_Window.fw.alpha = 0
            var d8list = depth(8).clickable(true).find()
            for (var index = d8list.length - 1; index >= 0; index--) {
                d8list[index].click()
            }
            f_Window.fw.alpha = 1
        }
    }
}

//判断线程
function Floaty_t(){
    // 悬浮框线程
    f_Window = floaty.rawWindow(
        <frame id="fw" gravity="center">
            <text id="text" textColor="#1FCB8C" gravity="center"  text="点击可调整位置" textSize="16sp"/>
        </frame>
    );
    ui.run(function(){
        f_Window.text.setText("未进入知到app")
    })

    while(currentPackage() != zhspgname);
    ui.run(function(){f_Window.text.setText("进入知到app,请进入课堂")})
    id("continue_study_btn").waitFor();
    id("continue_study_btn").findOne().click()

    //调整悬浮框位置
    var element = id("tv_tab_title").text("教程").findOne()
    var pos = element.bounds()
    x = pos.left
    y = pos.top
    var width = pos.width()
    var height  =  pos.height()
    ui.run(function(){
        f_Window.fw.attr("bg","#FFFFFFFF")
    })
    f_Window.setTouchable(false)
    f_Window.setPosition(x, y)
    f_Window.setSize(width, height)

    //设置启动时间
    startTime = new Date().getTime()
    //开始判断
    ConfirmTime()
    f_Window.close()
    back()
    while(!id("positiveButton").text("确定").exists());
    id("positiveButton").text("确定").findOne().click()

    if(ui.willback.checked){
        launchPackage(selfname)
    }
    if(ui.willalarm.checked){
        alarm()
    }
}

//ui布局
ui.layout(
    <vertical padding="16">
         <text text="输入观看时间(分钟)"  textColor="black" textSize="16sp" marginTop="16"/>
         <input id = "timetext" text = "30" marginTop = "16" inputType="number"/>
         <text text = "设置" textColor = "black" textSize= "16sp" marginTop = "16"/>
         <checkbox id = "willalarm" text = "完成时振动" checked="true"/>
         <checkbox id = "willback" text = "完成时返回到本应用" checked="false"/>
         <horizontal marginTop = "16">
         <button id="start" text="开始" w="auto" style="Widget.AppCompat.Button.Colored" />
         <button id="stop" text="强制结束" w="auto" style="Widget.AppCompat.Button.Colored" marginleft ="5"/>
         </horizontal>
    </vertical>
);
//设置监听事件
ui.start.click(()=>{
    device.setMusicVolume(0)
    maxtime = parseInt(ui.timetext.text()) * 60 
    launchApp("知到");
    var main_thread = threads.start(Floaty_t)
});
ui.stop.click(()=>{
    f_Window.close()
    threads.shutDownAll()
    main_thread = null
});