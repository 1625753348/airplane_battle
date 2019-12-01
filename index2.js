window.onload = function(){
    
    Game.exe();

}

var Game = {
    //启动程序
    exe : function(){
        document.body.style.background = "#000";
        var oDiv = document.createElement('div');
            oDiv.id = 'GameBox';
            oDiv.style.cssText = 'width:300px;height:500px;border:10px solid #fff;margin:50px auto;text-align:center;position:relative;';
            document.body.appendChild(oDiv);
        this.init();
    },
    score : 0,
    ifEnd : false,
    init: function(){
        This = this;
        var oDiv = document.getElementById('GameBox');
        oDiv.innerHTML = '';
        Game.ifEnd = false;
        Game.score = 0;
        var oH = document.createElement('h1');
            oH.innerHTML = '飞机大战';
            oH.style.cssText = 'color:#fff;font-size:26px;font-weight:normal;margin-top:20px;';
            oDiv.appendChild(oH);
           for(var i = 0; i < 4; i++){
               var oP = document.createElement('p');
                   oP.index = i;
                   oP.style.cssText = 'font-size:14px;color:#000;width:150px;height:40px;margin:50px auto;text-align:center;line-height:40px;background:#fff;cursor:pointer;'
               var html = '';
               oP.onmouseenter = function(){
                this.style.background = '#f60';
                this.style.color = '#fff';
                }
                oP.onmouseleave = function(){
                    this.style.background = '#fff';
                    this.style.color = '#000';
                }
                oP.onclick = function(e){
                    e = e||window.event;
                    This.start(this.index, oDiv, e);
                }
               switch(i){
                    case 0:
                        html = '简单难度';
                        break;
                    case 1:
                        html = '一般难度';
                        break;
                    case 2:
                        html = '困难难度';
                        break;
                    case 3:
                        html = 'vip通道'
                        oP.style.background = '#ffccff';
                        oP.style.color = '#f00';
                        oP.style.fontWeight = 'bold';
                        oP.onmouseenter = function(){
                            this.style.background = '#f60';
                            this.style.color = '#fff';
                        }
                        oP.onmouseleave = function(){
                            this.style.background = '#ffccff';
                            this.style.color = '#f00';
                        }
                        break;
               }
               oP.innerHTML = html;
               oDiv.appendChild(oP);
           }
    },
    //游戏开始
    start : function(index, oGameBox, e){
        oGameBox.innerHTML = '';
        var oS = document.createElement('span');
            oS.innerHTML = this.score;
            oS.style.cssText = 'position:absolute;top:15px;left:20px;font-size:14px;color:#fff;'
        oGameBox.appendChild( oS );
        this.plane(oGameBox, e, index);
        this.enemy(oGameBox, oS, index);
    },
    //我方飞机
    plane : function(oGameBox, e, index){
        var x = e.pageX,
            y = e.pageY;
        var oPlane = new Image();
            oPlane.src = 'plane2.png';
            oPlane.width = 60;
            oPlane.height = 36;
            oPlane.id = 'oPlane';
        var tY = oGameBox.offsetTop+parseInt(oGameBox.style.borderWidth)+oPlane.height/2;
        var lX = oGameBox.offsetLeft+parseInt(oGameBox.style.borderWidth)+oPlane.width/2;
        window.onresize = function(){
            lX = oGameBox.offsetLeft+parseInt(oGameBox.style.borderWidth)+oPlane.width/2;
        }
        var top = y -tY; 
        var left = x - lX;
            oPlane.style.cssText = 'display:block;position:absolute;top:'+ top +'px;left:'+ left +'px;';
            oGameBox.appendChild(oPlane);
        var leftMin = -oPlane.width/2;
        var leftMax = oGameBox.clientWidth - oPlane.width/2;
        var topMin = 0;
        var topMax = oGameBox.clientHeight - oPlane.height;
        document.onmouseover = function(e){
            if( !Game.ifEnd ){
                e = e || window.event;
                var left = e.pageX - lX;
                var top = e.pageY - tY;

                top = Math.min( top, topMax );
                top = Math.max( top, topMin );
                left = Math.min( left, leftMax );
                left = Math.max( left, leftMin );
                oPlane.style.left = left + 'px';
                oPlane.style.top = top + 'px'
            }
        }
        this.biubiubiu(oPlane, oGameBox, index);
    },

    //子弹
    biubiubiu : function(oPlane, oGameBox, index){

        var speed;
        switch (index){
            case 0:
                speed = 200;
                break;
            case 1:
                speed = 300;
                break;   
            case 2:
                speed = 400;
                break;
            case 3:
                speed = 50;
                break;    
        }
        this.biuTimer = setInterval( function(){
            var oBiu = new Image();
                oBiu.src = 'biubiu2.png';
                oBiu.width = 6;
                oBiu.height = 22;
                oBiu.className = 'biubiubiu';
            var top = oPlane.offsetTop - oBiu.height + 10;
            var left = oPlane.offsetLeft + oPlane.width/2 - oBiu.width/2;
                oBiu.style.cssText = 'position:absolute;top:'+ top +'px;left:'+ left +'px;';
            oGameBox.appendChild( oBiu );
                oBiu.timer = setInterval( function(){
                    if( !oBiu.parentNode){
                        clearInterval( oBiu.timer );
                    }
                    oBiu.style.top = oBiu.offsetTop - 3 + 'px';
                    if( oBiu.offsetTop < -oBiu.height ){
                        clearInterval( oBiu.timer );
                        oBiu.parentNode.removeChild( oBiu );
                    }
                }, 13)
        }, speed) //*************
    },
    //敌军
    enemy : function(oGameBox, oS, index){
        var a, x;
        switch (index){
            case 0:
                a = 1;
                x = 500;
                break;
            case 1:
                a = 3;
                x = 300;
                break;   
            case 2:
                a = 5;
                x = 200;
                break;
            case 3:
                a = 5;
                x = 100;
                break;    
        }
        this.enemyTimer = setInterval(function(){
            var oEnemy = new Image();
                oEnemy.src = 'enemy.png';
                oEnemy.width = 23;
                oEnemy.height = 30;
            var lMin = 0;
            var lMax = oGameBox.clientWidth - oEnemy.width;
            var left = parseInt(Math.random()*(lMax-lMin) + lMin);
                oEnemy.style.cssText = 'position:absolute;top:'+ (-oEnemy.height) +'px;left:'+left+'px;';
                oGameBox.appendChild(oEnemy);
                var b = parseInt(Math.random()*a+1);
                oEnemy.timer = setInterval(function(){
                    oEnemy.style.top = oEnemy.offsetTop + b + 'px';
                    if(oEnemy.offsetTop>=oGameBox.clientHeight){
                        clearInterval(oEnemy.timer);
                        oEnemy.parentNode.removeChild(oEnemy);
                    }
                },15);
                //和子弹的碰撞检测
                var allBiu = Game.getClass('biubiubiu');
                oEnemy.pzBiu = setInterval(function(){
                    for(var i = 0; i < allBiu.length; i++){
                       if(Game.boom( oEnemy, allBiu[i] )){
                            Game.score ++;
                            oS.innerHTML = Game.score;
                            oEnemy.src = 'boom.png';
                            clearInterval(oEnemy.pzBiu);
                            clearInterval(oEnemy.pzPlane);
                            allBiu[i].parentNode.removeChild(allBiu[i]);
                            setTimeout(function(){
                                 if(oEnemy.parentNode)
                                 {
                                    oEnemy.parentNode.removeChild(oEnemy);
                                 }
                            }, 300);
                            break;
                       }
                    }
                }, 100);

                //和玩家飞机碰撞检测
                var oPlane = document.getElementById('oPlane');
                oEnemy.pzPlane = setInterval(function(){
                    if( Game.ifEnd ){
                        clearInterval(oEnemy.pzPlane);
                    }
                    if(Game.boom( oEnemy , oPlane)){
                        Game.ifEnd = true;
                        clearInterval(oEnemy.pzPlane);
                        clearInterval(Game.biuTimer);
                        clearInterval(Game.enemyTimer);
                        oEnemy.src = 'boom.png';
                        oPlane.src = 'boom2.png';
                        setTimeout(function(){
                            Game.over(oGameBox);
                        }, 1000);
                    }
                }, 50);
        }, x);

    },
    //碰撞检测
    boom : function(obj1, obj2 ){
        var T1 = obj1.offsetTop;
        var B1 = T1 + obj1.clientHeight;
        var L1 = obj1.offsetLeft;
        var R1 = L1 + obj1.clientWidth;

        var T2 = obj2.offsetTop;
        var B2 = T2 + obj2.clientHeight;
        var L2 = obj2.offsetLeft;
        var R2 = L2 + obj2.clientWidth;

        if(R2 < L1 || L2 > R1 || B2 <T1 || T2 > B1){
            return false;
        }else{
            return true;
        }
    },
    //getClass
    getClass : function(cName, parent){
        parent = parent || document;
        if(document.getElementsByClassName){
            return document.getElementsByClassName(cName);
        }
        else{
            var all = parent.getElementsByTagName('*');
            var arr = [];
            for(var i = 0; i < all.length; i++){
                var arrClass = all.className.split(' ');
                for(var j = 0; j < arrClass.length; j++){
                    if(arrClass[j] == cName){
                        arr.push(all[i]);
                        break;
                    }
                }
            }
            return arr;
        }
        
    },
    //游戏结束
    over : function(oGameBox){
        oGameBox.innerHTML = '';
        var oDiv = document.createElement('div');
            oDiv.style.cssText = 'width:200px;height:400px;margin:50px;background:#fff;';
        var oT = document.createElement('h3');
            oT.innerHTML = 'Game Over';
            oT.style.cssText = 'padding-top:50px;';
        var oP1 = document.createElement('p');
            oP1.innerHTML = '您的得分是：' + '<span style="color:#f00;font-weight:bold;">'+this.score+'</span>';
            oP1.style.cssText = 'font-size: 16px;color:#000;margin-top:50px;';
        var oRestart = document.createElement('div');
            oRestart.style.cssText = 'width:100px;height:40px;font-size:14px;text-align:center;line-height:40px;color:#f60;background:#ccc;margin:150px auto;border-radius:3px;cursor:pointer;';
            oRestart.innerHTML = '重新开始';
        oRestart.onclick = function(){
            Game.init();
        }
        oDiv.appendChild(oT);
        oDiv.appendChild(oP1);
        oDiv.appendChild(oRestart);
        oGameBox.appendChild(oDiv);
    }
}