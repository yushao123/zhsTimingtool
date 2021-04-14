/*
测试项目，检测智慧树的组件位置
*/
//包名：com.able.wisdomtree


var window = floaty.window(
    <frame gravity="center">
        <text id="text" text="点击可调整位置" textSize="16sp"/>
    </frame>
);
window.exitOnClose();
window.text.click(()=>{
    window.setAdjustEnabled(!window.isAdjustEnabled());
});

ui.run(function(){
    window.text.setText("未进入知到app")
})
while(currentPackage() != "com.able.wisdomtree");
ui.run(function(){
    window.text.setText("进入知到app")
})
sleep(500)
// id("continue_study_btn").waitFor();

// ui.run(function(){
//     window.text.setText("开始")
// })

ke = editable(true).findOne();
ke.setText("可点击")

// text("教程").waitFor();
// jc =  text("教程").findOne();
// jc.editable(true)
// ui.run(function(){
//     window.text.setText(jc.setText("哈哈哈").toString())
// })

// text("关闭").findOne().click()

text("A").waitFor()

ui.run(function(){
    window.text.setText("出现选项")
})
text("E").waitFor()

