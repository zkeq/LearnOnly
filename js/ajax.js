var xiha={
	postData: function(url, parameter, callback, dataType, ajaxType) {
		if(!dataType) dataType='json';
		$.ajax({
			type: "POST",
			url: url,
			async: true,
			dataType: dataType,
			json: "callback",
			data: parameter,
			success: function(data) {
				if (callback == null) {
					return;
				} 
				callback(data);
			},
			error: function(error) {
				alert('网络错误');
			}
		});
	}
}
function trim(str){ //去掉头尾空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
function sign(){
	$("#sign").html("请稍等正在签到...");
    xiha.postData("api.php?do=sign","r="+Math.random(1),function(d){
       if(d.code==200){$("#sign").html("签到成功，经验+"+d.point);
       }else{$("#sign").html("签到失败:"+d.msg);}
    });
}
function daka(){
$("#daka").html("请耐心等待半分钟...");
    xiha.postData("api.php?do=daka","r="+Math.random(1),function(d){
       if(d.code==200){$("#daka").html("打卡成功，听歌"+d.count+"首");
       }else{$("#daka").html("未知错误");}
    });
}
function check(){
    xiha.postData("api.php?do=check","r="+Math.random(1),function(d){
       if(d.code==200||d.code==201||d.code==400){
            $('#login').hide();
			$('.code').hide();
			$('#submit').hide();
			$("#load").show();		
			$('#load').html('<div class="alert alert-danger animated rubberBand" style="background: linear-gradient(to right,#EEA2AD,#EE8262);font-weight: bold;color:white;">检测到登录记录！</div><button type="button" id="sign" class="btn btn-danger btn-block" style="background:#FF6A6A;">签到</button><br/><button type="button" id="daka" class="btn btn-danger btn-block" style="background:#FF6A6A;">打卡</button><br/><a id="relogin">返回重新登录</a>');
			$("#relogin").click(function(){init();});
			$('#sign').click(function(){sign();});
			$('#daka').click(function(){daka();});
       
       }
    });
}



function init(){
$('#login').show();
$('#submit').show();
$("#load").hide();
}
function login(uin,pwd){
	$('#load').html('正在登录，请稍等...');
	var loginurl="api.php?do=login";
	xiha.postData(loginurl,"uin="+uin+"&pwd="+md5(pwd)+"&r="+Math.random(1), function(d) {
		if(d.code ==200){
		    //xiha.postData("api.php?do=check","r="+Math.random(1),function(d){});
			$('#login').hide();		
			$('#submit').hide();
			$('#load').html('<div class="alert alert-danger animated rubberBand" style="background: linear-gradient(to right,#EEA2AD,#EE8262);font-weight: bold;color:white;">用户：'+decodeURIComponent(d.profile.nickname)+' 登录成功！</div><button type="button" id="sign" class="btn btn-danger btn-block" style="background:#FF6A6A;">签到</button><br/><button type="button" id="daka" class="btn btn-danger btn-block" style="background:#FF6A6A;">打卡</button><br/><a href="./">点我返回首页重新登录</a>');
			$('#sign').click(function(){sign();});
			$('#daka').click(function(){daka();});
		}else if(d.code ==502){
			$('#load').html('密码错误！');
			$('#submit').attr('do','submit');		
			$('#login').show();
		}else{
			$('#load').html('登录失败，请使用手机号登录！');
			$('#submit').attr('do','submit');
			$('#login').show();}
	});
	
}

$(document).ready(function(){
    
	$('#submit').click(function(){
		var self=$(this);
		var uin=trim($('#uin').val()),
			pwd=trim($('#pwd').val());
		if(uin==''||pwd=='') {
			alert("请确保每项不能为空！");
			return false;
		}
		$('#load').show();
		login(uin,pwd);
	});

});