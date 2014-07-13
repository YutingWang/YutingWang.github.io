var a_Colour='fff000'; <!--第一个轨迹的颜色-->
var b_Colour='00ff00'; <!--第二个轨迹的颜色-->
var c_Colour='ff00ff'; <!--第三个轨迹的颜色-->
var Size=120;
var YDummy=new Array(),XDummy=new Array(),xpos=0,ypos=0,ThisStep=0;step=0.6;
document.all <!--如果是ie浏览器-->
{ //欢迎来到站长特效网，我们的网址是www.zzjs.net，很好记，zz站长，js就是js特效，本站收集大量高质量js代码，还有许多广告代码下载。
function ieMouse(){
xpos = document.body.scrollLeft+event.x+6; <!--获得现在鼠标的横坐标-->
ypos = document.body.scrollTop+event.y+16; <!--获得现在鼠标的纵坐标-->
}
document.onmousemove = ieMouse;
} //欢迎来到站长特效网，我们的网址是www.zzjs.net，很好记，zz站长，js就是js特效，本站收集大量高质量js代码，还有许多广告代码下载。
function swirl(){
for (i = 0; i < 3; i++) <!--依次处理三个轨迹-->
{
YDummy[i]=ypos+Size*Math.sin((1*Math.sin((ThisStep)/10))+i*2)*Math.sin((ThisStep)/4); <!--计算得到第i个轨迹上每一点的横坐标-->
XDummy[i]=xpos+Size*Math.cos((1*Math.sin((ThisStep)/10))+i*2)*Math.sin((ThisStep)/4); <!--计算得到第i个轨迹上每一点的纵坐标-->
}
ThisStep+=step;
setTimeout('swirl()',10); <!--周期性调用swirl函数-->
}
var amount=10;
if ( document.all){ <!--如果是ie浏览器-->
document.write(' <div id="ODiv" style="position:absolute;top:0px;left:0px">'
+' <div id="IDiv" style="position:relative">');
for (i = 0; i < amount; i++) <!--依次处理每一个点-->
{
document.write(' <div id=x style="position:absolute;top:0px;left:0px;width:'+i/2+';height:'+i/2+';background:'+a_Colour+';font-size:'+i/2+'"> </div>'); <!--第一个轨迹所在的页面-->
document.write(' <div id=y style="position:absolute;top:0px;left:0px;width:'+i/2+';height:'+i/2+';background:'+b_Colour+';font-size:'+i/2+'"> </div>'); <!--第二个轨迹所在的页面-->
document.write(' <div id=z style="position:absolute;top:0px;left:0px;width:'+i/2+';height:'+i/2+';background:'+c_Colour+';font-size:'+i/2+'"> </div>'); <!--第三个轨迹所在的页面-->
}
document.write(' </div> </div>');
}
function prepos(){
var msie=document.all; <!--获得ie浏览器的当前页面-->
if(document.all){ <!--如果是ie浏览器-->
for (i = 0; i < amount; i++) <!--依次处理每一个点-->
{
if (i < amount-1) <!--对于前amount－1个点-->
{
msie.x[i].style.top=msie.x[i+1].style.top;msie.x[i].style.left=msie.x[i+1].style.left; <!--更新第一个轨迹上各个点上的上边界和左边界-->
msie.y[i].style.top=msie.y[i+1].style.top;msie.y[i].style.left=msie.y[i+1].style.left; <!--更新第二个轨迹上各个点上的上边界和左边界-->
msie.z[i].style.top=msie.z[i+1].style.top;msie.z[i].style.left=msie.z[i+1].style.left; <!--更新第三个轨迹上各个点上的上边界和左边界-->
}
else
{//欢迎来到站长特效网，我们的网址是www.zzjs.net，很好记，zz站长，js就是js特效，本站收集大量高质量js代码，还有许多广告代码下载。
msie.x[i].style.top=YDummy[0];msie.x[i].style.left=XDummy[0]; <!--更新第一个轨迹上最后一个点上的上边界和左边界-->
msie.y[i].style.top=YDummy[1];msie.y[i].style.left=XDummy[1]; <!--更新第二个轨迹上最后一个点上的上边界和左边界-->
msie.z[i].style.top=YDummy[2];msie.z[i].style.left=XDummy[2]; <!--更新第三个轨迹上最后一个点上的上边界和左边界-->
}
}
}
setTimeout("prepos()",10); <!--周期性调用prepos函数-->
} //欢迎来到站长特效网，我们的网址是www.zzjs.net，很好记，zz站长，js就是js特效，本站收集大量高质量js代码，还有许多广告代码下载。
function Start(){ <!--开始函数-->
swirl(),prepos() <!--依次调用swirl和prepos函数-->
}
window.onload=Start; <!--调用start函数-->
