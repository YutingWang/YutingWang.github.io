//画基本格子
N = 20;
cell = 0;//活细胞/整体细胞
gameOver = 0;//1 结束 0 不结束
now = new Array(N*N);//棋盘上现在的状态，0-死细胞，1-活细胞
future = new Array(N*N);//棋盘将要变为的状态
var time  =  null;
TIME = 500;
var isStart = false;//记录游戏是否开始

//画格子
for(var i = 0; i < N; i++) $("table").prepend("<tr></tr>");
for(var i = 0; i < N; i++) $("tr").prepend("<td></td>");
//给格子编号id，从0开始
for(var i = 0; i < $("td").length; i++)
{
    $($("td")[i]).attr("id", Number(i));
    $($("td")[i]).attr("onclick", "changeColor("+i+")");
    $($("td")[i]).css("background-color", "black");
}


//设置格子的大小符合屏幕要求
$("td").css("width", Math.floor(500/N) );
$("td").css("height", Math.floor(500/N));

//给按钮添加相应事件
$("#loadGame").attr("onclick","initial("+cell+")");
$("#startGame").attr("onclick","startGame()");
$("#stopGame").attr("onclick","stopGame()");
$(document).ready(function(){  $("input[name=input]").focus();});

function changeColor(i){
	if(now[i]==0){
		now[i]=1;
		$($("td")[i]).css("background-color", "rgba(71,204,237,0.7)");
	}
	else{
		now[i]=0;
		$($("td")[i]).css("background-color", "black");
	}
}
//初始化now[],来获得相应活细胞比例的棋盘分布
function initial(cell){
	cell = $('input')[0].value;
	if(cell < 0||cell > 1||cell=="")
	{
		alert("请输入0-1之间的数字~");
		return;
	}
	var key = cell * 100;
	for(var i = 0; i < $("td").length; i++){
		var random = Math.floor(Math.random()*100);
		if(random >= key)//死的
		{
			now[i] = 0;
			future[i] = 0;
			$($("td")[i]).css("background-color", "black");
		}
		else
		{
			now[i] = 1;
			future[i] = 0;
			$($("td")[i]).css("background-color", "rgba(71,204,237,0.7)");
		}
	}
}

//刷新棋盘
function placeCell(){
	for(var i = 0; i < $("td").length; i++){
		if(now[i] == 0)//死的
			$($("td")[i]).css("background-color", "black");
		else//活的
			$($("td")[i]).css("background-color", "rgba(71,204,237,0.7)");
	}
}

function changeStatus(i, j){
	var result;
	live = now[(j-1+N)%N + i*N] + now[(j-1+N)%N + (i-1+N)%N*N] + now[j + (i-1+N)%N*N] + now[(j+1+N)%N + (i-1+N)%N*N] +
				   now[(j+1+N)%N + i*N] + now[(j+1+N)%N + (i+1+N)%N*N] + now[j + (i+1+N)%N*N] + now[(j-1+N)%N + (i+1+N)%N*N];
			if(live == 3) result = 1;
			else if (live == 2) result  = now[ i*N +j];
			else result = 0;
	return result;
}

//计算未来状态
function changeCell(){
	for(var i = 0; i < N; i++)
	{
		for(var j = 0; j < N; j++)
		{
			future[i*N + j] = changeStatus(i, j);
		}
	}
	return future;
}

//判断是否继续
function endOfLife(){
	gameOver = 1;//默认游戏结束
	for(var i = 0; i < $("td").length; i++){
		if(future[i] != now[i] ) {//细胞有变化
			gameOver = 0;//游戏继续
			break;
		}
	}
}


//继续游戏
function continueGame(){
	changeCell();//根据当前状态，计算下一阶段状态
	endOfLife();//判断是否结束
	if(gameOver == 1)
	{
		alert("gameOver!");
		isStart = false;
		window.clearInterval(time);
	}

	else//不结束，根据未来状态刷新屏幕
	{
		for(var i = 0; i < $("td").length; i++)
			now[i] = future[i];
		placeCell();//刷新屏幕
		console.log(1);
	}
}

//开始游戏
function startGame(){
	if(isStart==false)
	{
  		time = window.setInterval("continueGame()",TIME);
  		isStart = true;
	}
}


function stopGame(){
	window.clearInterval(time);
	isStart=false;
}

function keydown(e)
{
　 var currKey=0;
   e=e||event;
　 currKey=e.keyCode||e.which||e.charCode;
   switch(currKey)
   {
    case 38:  
    TIME-=100; 
    window.clearInterval(time);
    time = window.setInterval("continueGame()",TIME);
    break;//UP
    case 40:  
    TIME+=100;
    window.clearInterval(time);
    time = window.setInterval("continueGame()",TIME);
    break;//DOWN
   }
}
document.onkeydown = keydown;
