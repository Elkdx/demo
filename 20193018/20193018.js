  <!--
  //设计“word对象”的数据结构，并用对象的方法实现初步的代码组织
  //en6为全局变量，由大学英语6级词汇形成字符串，组成数组
   var myWord = {
	  id: 0 ,
	  wordArr:[],
	  en: "" ,
	  pn: "" ,
	  cn: "" ,
      getWord: function(id){

	  },//end of getWord Method
	 showWord : function(id){

	 } //end of showWord Method
   };//end of myWord Object


   myWord.wordArr=en6;   


myWord.getWord =function(id){

	 this.id = id ;	
	var dc=this.wordArr[id];
	this.en=dc.substring(0,dc.search("/"));//search返回在数组中的位置
	dc = dc.substring(dc.search("/")+1);
	this.pn="/"+dc.substring(0,dc.search("/"))+"/";
	this.cn=dc.substring(dc.search("/")+1);

};//end of word.getWordById function

//建立一个模型对象，模拟和记录APP的运行状态
  var Model = {
    learnWords : [] , //学习单词的id组成的数组
	learnId : 0 ,
	myButton: "" ,
	myImages: null ,
    showHelp: function(){
	
	},//End of showHelp
  }; //End of  Model 

  //每次循环产生10个随机单词放在 Model 模型中

  Model.showHelp=function(){
  
		
  
  }
   window.onload = function(){
//动态控制UI，包括：不同屏幕的字体大小设置，主区域的高度设置
	var enDom=document.querySelector("input#en");//英语单词行
	var pnDom=document.querySelector("p#pn");//音标行
	var cnDom=document.querySelector("p#cn");//中文解释行
	var pDom=document.querySelector("h1");//“当前单词”
	var pinforDom=document.querySelector("p#textInfo");
	var buttonDom=document.querySelector("div#button");
	var h1=document.querySelector("h1#h1")
	var helpDom=document.querySelector("article#help");
    var fontSize =  Math.floor(window.innerWidth/100) ;
	switch (fontSize){
	 case 15 : 
	 case 14 : 
	 case 13 : 
	 case 12 :  
	 case 11 :
     case 10 : fontSize =  fontSize*1.5 ; break;
     case 9 :
     case 8 :
     case 7 :  fontSize =  fontSize*2 ; break;
     case 6 :
     case 5 :
     case 4 : fontSize =  fontSize*2.8; break;
	 default: fontSize =  fontSize*4 ; 
	}
	document.body.style.fontSize = fontSize + "px" ;
   
   var sectionHeight =  window.innerHeight - 150 - 50 - 50 ;
   document.querySelector("section").style.height = sectionHeight + "px";
 
 //为所有自定义的按钮设定特殊风格
   var myButtons = document.querySelectorAll("nav span");
   for (var i=0; i<myButtons.length ; i++) {
	   myButtons[i].onclick = function(){
	     for (var j=0; j<myButtons.length ; j++){
			 myButtons[j].className = "" ;
	     }
		this.className = "onclickStyle" ;
	   };//end of  myButtons[i].onclick
   }
 
   //每次打开页面，则随机出现一张图片
   var myImages = [] ;//图像对象 组成的 数组
   for (var i=1; i<8; i++ ){
	   var img = new Image();
	   img.src = "images/" + i + ".jpg" ;
	   //img.style.opacity = "0.5" ;
	   myImages.push(img) ;
   }
       Model.myImages = myImages ;//把图片集传给Model对象，提供使用
   var backPicDom =  document.querySelector("article#help div#backPic") ;
   var randInt =  Math.floor(Math.random()*7) ;
   backPicDom.appendChild(myImages[randInt]);

/*
   //随机选择一个单词
   var randInt = Math.floor(Math.random()*en6.length) ;
   myWord.getWord(randInt);
   myWord.showWord();
*/

function getRandomInt(max) {
    
     return Math.floor(Math.random() * max); //含最大值，含最小值 
 } //取一个随机数，其最小值为0，最大值为max
  for (var i = 0; i < 10; i++) {
     var num = getRandomInt( en6.length);
     num = parseInt(num, 10);//将num变成10进制整数
     Model.learnWords.push(num);//存入Model.learmWords数组中
  }//随机取10个数



  var arrTen = [0,1, 2, 3, 4, 5,6,7,8,9];
  arrTen.sort(function(a,b){return Math.random()>0.5 ? -1 : 1;});//sort函数比较遍历每两个数进行比较，通过返回的值的正负排序，再通过一个随机函数返回随机正负值，达到随机排序
	

document.querySelector("span#read").onclick=function(){
		 backPicDom.textContent="";
		 backPicDom.appendChild(myImages[1]);
		pinforDom.textContent="Press e to enter the next word and Q to enter the previous word,按E进入下一个单词，按Q进入上一个单词";

		enDom.disabled="disabled";//设置英语行不可编辑
		buttonDom.textContent="";
		var i=0;//初始化i=0
		h1.textContent="当前单词：第"+(i+1)+"个";//改变h1的值
		myWord.getWord( Model.learnWords[i]);//获取i对应的单词
		enDom.value=myWord.en;
		pnDom.textContent=myWord.pn;
		cnDom.textContent=myWord.cn;//设置三行的值，为初始化i=0时的单词


		var nextDom=document.createElement("span");
		nextDom.textContent="下一个单词";
		nextDom.border="2px solid";
		nextDom.onclick=function(){
		i++;
		if(i>=10){i=0;}
		h1.textContent="当前单词：第"+(i+1)+"个";//改变h1的值
		myWord.getWord( Model.learnWords[i]);
		enDom.value=myWord.en;
		pnDom.textContent=myWord.pn;
		cnDom.textContent=myWord.cn;
		
	}//end of nextDom.onclick 创建下一个单词按钮


	var preDom=document.createElement("span");
		preDom.textContent="上一个单词";
		preDom.color="green";
		
		preDom.onclick=function(){
		i--;
		if(i<0){i=9;}
		h1.textContent="当前单词：第"+(i+1)+"个";//改变h1的值
		myWord.getWord( Model.learnWords[i]);
		enDom.value=myWord.en;
		pnDom.textContent=myWord.pn;
		cnDom.textContent=myWord.cn;
		
	}//end of preDom.onclick 创建下一个单词按钮
	buttonDom.appendChild(preDom);
	buttonDom.appendChild(nextDom);

	document.body.onkeypress=function(eObj){
		
			var key =eObj.keyCode;
			console.log(eObj.keyCode);
		if(key===13||key===32||key===101){nextDom.onclick();}
		if(key===113){preDom.onclick();
		}
		}
	

	}//end of document.querySelector("span#read").onclick


document.querySelector("span#write").onclick=function(){


	backPicDom.textContent="";
		 backPicDom.appendChild(myImages[2]);
		pinforDom.textContent="输入正确的英文，也可以按enter跳过，每次10个单词，总分100分";


	arrTen.sort(function(a,b){return Math.random()>0.5 ? -1 : 1;});
	enDom.disabled="";//移除不可编辑属性
	buttonDom.textContent="";
	var i=0;//初始化i=0
	h1.textContent="当前单词：第"+(i+1)+"个";//改变h1的值
	myWord.getWord( Model.learnWords[arrTen[i]]);//获取i对应的单词
	enDom.value="";
	pnDom.textContent=myWord.pn;
	cnDom.textContent=myWord.cn;
	var score=0;
	
	var nextDom=document.createElement("span");
		
		nextDom.textContent="下一个单词";
		nextDom.border="2px solid";
		nextDom.onclick=function(){
		if(enDom.value===myWord.en){score+=10;}
		i++;
		if(i>=9){
			i=9;
			h1.textContent="填写完毕，你的总分是"+score+"/100";
		}
		else{
		h1.textContent="当前单词：第"+(i+1)+"个";//改变h1的值
		myWord.getWord( Model.learnWords[arrTen[i]]);
		enDom.value="";
		pnDom.textContent=myWord.pn;
		cnDom.textContent=myWord.cn;}
		}//end of nextDom.onclick
		buttonDom.appendChild(nextDom);


		document.body.onkeypress=function(eObj){
		
			var key =eObj.keyCode;
			console.log(eObj.keyCode);
		if(key===13||key===32){nextDom.onclick();}
		
		
		}
		
}//end of span#write


document.querySelector("span#select").onclick=function(){

	backPicDom.textContent="";
		 backPicDom.appendChild(myImages[3]);
		pinforDom.textContent="点击你认为正确的中文解释，可以按enter跳过，总共10道题，满分100";

	arrTen.sort(function(a,b){return Math.random()>0.5 ? -1 : 1;});
	enDom.disabled="disabled";//设置英语行不可编辑
	buttonDom.textContent="";
	var i=0;//初始化i=0
	h1.textContent="当前单词：第"+(i+1)+"个";//改变h1的值
	myWord.getWord( Model.learnWords[arrTen[i]]);//获取i对应的单词
	enDom.value=myWord.en;
	pnDom.textContent="";
	cnDom.textContent="";
	var aDom=document.createElement("div");
	var bDom=document.createElement("div");
	var cDom=document.createElement("div");
	var dDom=document.createElement("div");
	var score=0;
	var aaa=[];
	var s=Math.floor(Math.random()*4)+1;

	if(s===1){
		 aaa.splice(0, aaa.length);
		aDom.textContent="A"+"---"+myWord.cn;
		for (var j = 0; j < 3; j++) {
		var num =Math.floor(Math.random()*en6.length);
		//将num变成10进制整数
		aaa.push(num);}//存入Model.learmWords数组中
		myWord.getWord(aaa[0]);
		bDom.textContent="B"+"---"+myWord.cn;
		myWord.getWord(aaa[1]);
		cDom.textContent="C"+"---"+myWord.cn;
		myWord.getWord(aaa[2]);
		dDom.textContent="D"+"---"+myWord.cn;	
	}

	if (s===2)
	{
		 aaa.splice(0, aaa.length);
		bDom.textContent="B"+"---"+myWord.cn;
		for (var j = 0; j < 3; j++) {
		var num =Math.floor(Math.random()*en6.length);
		aaa.push(num);}//存入Model.learmWords数组中
		myWord.getWord(aaa[0]);
		aDom.textContent="A"+"---"+myWord.cn;
		myWord.getWord(aaa[1]);
		cDom.textContent="C"+"---"+myWord.cn;
		myWord.getWord(aaa[2]);
		dDom.textContent="D"+"---"+myWord.cn;	
	}

	if (s===3)
	{
		 aaa.splice(0, aaa.length);
		cDom.textContent="C"+"---"+myWord.cn;
		for (var j = 0; j < 3; j++) {
		var num =Math.floor(Math.random()*en6.length);
		aaa.push(num);}//存入Model.learmWords数组中
		myWord.getWord(aaa[0]);
		aDom.textContent="A"+"---"+myWord.cn;
		myWord.getWord(aaa[1]);
		bDom.textContent="B"+"---"+myWord.cn;
		myWord.getWord(aaa[2]);
		dDom.textContent="D"+"---"+myWord.cn;	
	}

	if (s===4)
	{
		 aaa.splice(0, aaa.length);
		dDom.textContent="D"+"---"+myWord.cn;
		for (var j = 0; j < 3; j++) {
		var num = getRandomInt( en6.length);
		num = parseInt(num, 10);//将num变成10进制整数
		aaa.push(num);}//存入Model.learmWords数组中
		myWord.getWord(aaa[0]);
		aDom.textContent="A"+"---"+myWord.cn;
		myWord.getWord(aaa[1]);
		bDom.textContent="B"+"---"+myWord.cn;
		myWord.getWord(aaa[2]);
		cDom.textContent="C"+"---"+myWord.cn;	
	}
	aDom.onclick=function(){
		myWord.getWord( Model.learnWords[arrTen[i]])
		if(this.textContent==="A"+"---"+myWord.cn||this.textContent==="B"+"---"+myWord.cn||this.textContent==="C"+"---"+myWord.cn||this.textContent==="D"+"---"+myWord.cn){score+=10;}
		nextDom.onclick();
	}
	bDom.onclick=function(){
		myWord.getWord( Model.learnWords[arrTen[i]])
		if(this.textContent==="A"+"---"+myWord.cn||this.textContent==="B"+"---"+myWord.cn||this.textContent==="C"+"---"+myWord.cn||this.textContent==="D"+"---"+myWord.cn){score+=10;}
		nextDom.onclick();
	}
	cDom.onclick=function(){
		myWord.getWord( Model.learnWords[arrTen[i]])
		if(this.textContent==="A"+"---"+myWord.cn||this.textContent==="B"+"---"+myWord.cn||this.textContent==="C"+"---"+myWord.cn||this.textContent==="D"+"---"+myWord.cn){score+=10;}
		nextDom.onclick();
	}
	dDom.onclick=function(){
		myWord.getWord( Model.learnWords[arrTen[i]])
		if(this.textContent==="A"+"---"+myWord.cn||this.textContent==="B"+"---"+myWord.cn||this.textContent==="C"+"---"+myWord.cn||this.textContent==="D"+"---"+myWord.cn){score+=10;}
		nextDom.onclick();
	}
	cnDom.appendChild(aDom);
	cnDom.appendChild(bDom);
	cnDom.appendChild(cDom);
	cnDom.appendChild(dDom);
	var nextDom=document.createElement("span");
	nextDom.textContent="下一个单词";
		nextDom.border="2px solid";
		nextDom.onclick=function(){
		i++;
		if(i>=9){
		i=9;
		h1.textContent="填写完毕，你的总分是"+score+"/100";
		}
	else{h1.textContent="当前单词：第"+(i+1)+"个";//改变h1的值
	myWord.getWord( Model.learnWords[arrTen[i]]);//获取i对应的单词
	enDom.value=myWord.en;
	pnDom.textContent="";
	cnDom.textContent="";
	var ss=Math.floor(Math.random()*4)+1;
	
	if(ss===1){
		 aaa.splice(0, aaa.length);
		aDom.textContent="A"+"---"+myWord.cn;
		for (var j = 0; j < 3; j++) {
		var num =Math.floor(Math.random()*en6.length);
		//将num变成10进制整数
		aaa.push(num);}//存入Model.learmWords数组中
		myWord.getWord(aaa[0]);
		bDom.textContent="B"+"---"+myWord.cn;
		myWord.getWord(aaa[1]);
		cDom.textContent="C"+"---"+myWord.cn;
		myWord.getWord(aaa[2]);
		dDom.textContent="D"+"---"+myWord.cn;	
	}

	if (ss===2)
	{
		 aaa.splice(0, aaa.length);
		bDom.textContent="B"+"---"+myWord.cn;
		for (var j = 0; j < 3; j++) {
		var num =Math.floor(Math.random()*en6.length);
		aaa.push(num);}//存入Model.learmWords数组中
		myWord.getWord(aaa[0]);
		aDom.textContent="A"+"---"+myWord.cn;
		myWord.getWord(aaa[1]);
		cDom.textContent="C"+"---"+myWord.cn;
		myWord.getWord(aaa[2]);
		dDom.textContent="D"+"---"+myWord.cn;	
	}

	if (ss===3)
	{
		 aaa.splice(0, aaa.length);
		cDom.textContent="C"+"---"+myWord.cn;
		for (var j = 0; j < 3; j++) {
		var num =Math.floor(Math.random()*en6.length);
		aaa.push(num);}//存入Model.learmWords数组中
		myWord.getWord(aaa[0]);
		aDom.textContent="A"+"---"+myWord.cn;
		myWord.getWord(aaa[1]);
		bDom.textContent="B"+"---"+myWord.cn;
		myWord.getWord(aaa[2]);
		dDom.textContent="D"+"---"+myWord.cn;	
	}

	if (ss===4)
	{
		 aaa.splice(0, aaa.length);
		dDom.textContent="D"+"---"+myWord.cn;
		for (var j = 0; j < 3; j++) {
		var num = getRandomInt( en6.length);
		num = parseInt(num, 10);//将num变成10进制整数
		aaa.push(num);}//存入Model.learmWords数组中
		myWord.getWord(aaa[0]);
		aDom.textContent="A"+"---"+myWord.cn;
		myWord.getWord(aaa[1]);
		bDom.textContent="B"+"---"+myWord.cn;
		myWord.getWord(aaa[2]);
		cDom.textContent="C"+"---"+myWord.cn;	
	}

	aDom.onclick=function(){
		myWord.getWord( Model.learnWords[arrTen[i]])
		if(this.textContent==="A"+"---"+myWord.cn||this.textContent==="B"+"---"+myWord.cn||this.textContent==="C"+"---"+myWord.cn||this.textContent==="D"+"---"+myWord.cn){score+=10;}
		nextDom.onclick();
	}
	bDom.onclick=function(){
		myWord.getWord( Model.learnWords[arrTen[i]])
		if(this.textContent==="A"+"---"+myWord.cn||this.textContent==="B"+"---"+myWord.cn||this.textContent==="C"+"---"+myWord.cn||this.textContent==="D"+"---"+myWord.cn){score+=10;}
		nextDom.onclick();
	}
	cDom.onclick=function(){
		myWord.getWord( Model.learnWords[arrTen[i]])
		if(this.textContent==="A"+"---"+myWord.cn||this.textContent==="B"+"---"+myWord.cn||this.textContent==="C"+"---"+myWord.cn||this.textContent==="D"+"---"+myWord.cn){score+=10;}
		nextDom.onclick();
	}
	dDom.onclick=function(){
		myWord.getWord( Model.learnWords[arrTen[i]])
		if(this.textContent==="A"+"---"+myWord.cn||this.textContent==="B"+"---"+myWord.cn||this.textContent==="C"+"---"+myWord.cn||this.textContent==="D"+"---"+myWord.cn){score+=10;}
		nextDom.onclick();
	}
	
	cnDom.appendChild(aDom);
	cnDom.appendChild(bDom);
	cnDom.appendChild(cDom);
	cnDom.appendChild(dDom);
	

	}


	}//end of next
	buttonDom.appendChild(nextDom);


	document.body.onkeypress=function(eObj){
		
			var key =eObj.keyCode;
			console.log(eObj.keyCode);
		if(key===13||key===32){nextDom.onclick();}
		
		}


}//end of span#select

document.querySelector("span#search").onclick=function(){
	
	backPicDom.textContent="";
	backPicDom.appendChild(myImages[4]);
	pinforDom.textContent="在搜索框中输入你想搜索的单词，按enter键确定";
	
	enDom.disabled="";//设置英语行可编辑


	buttonDom.textContent="";
	enDom.value="在这里输入单词";
	pnDom.textContent="";
	cnDom.textContent="";
	h1.textContent="";	
		var search=document.createElement("span");
		search.textContent="saerch";
		search.style.fontSize=4+'px';
		search.onclick=function(){
			for (var i=0;i<myWord.wordArr.length+1 ;i++ )
			{
				if(i===myWord.wordArr.length)
				{	pnDom.textContent="";
					cnDom.textContent="没有这个单词";}
				else{
				myWord.getWord(i);
				if(enDom.value===myWord.en)
				{pnDom.textContent=myWord.pn;
				cnDom.textContent=myWord.cn;
				i=myWord.wordArr.length+1;}
				}
			}
		}
		buttonDom.appendChild(search);

		document.body.onkeypress=function(eObj){
		
			var key =eObj.keyCode;
			console.log(eObj.keyCode);
		if(key===13||key===32){search.onclick();}
		
		}
	}//end of search
  
   };//end of window.onload 
  //-->

