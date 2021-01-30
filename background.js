// ==UserScript==
// @name           A task PopUp [~developing]
// @description    Yours Tasks in POP-UP! Using JQuery & JS. 
// @author         Marlon Rebello Viana
// @include        https://*
// @version        1.0
// ==/UserScript==

/* @Observations   1 - ! Sometimes the css of pages can crash the style of the pop-UP.

2 - !!! style Will crash in some pages, like github and Google because script security: "Refused to execute inline event handler because it violates the following Content Security Policy directive: "script-src github.githubassets.com". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution."

3 - !!! This happens to: Refused to execute inline event handler because it violates the following Content Security Policy directive: "script-src github.githubassets.com". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution.

*/


/*
Coisas à fazer:


Fundamentais:
[ ] Transformar em Extensão do Chrome
[ ] Colocar Data e hora nas tasks
[ ] Despertador
[ ] Cronômetro
[ ] Timer
[ ] Minimizar/abrir --- [ ] X 
[ ] Aumentar ou diminuir Caixa
	[ ] Config - [x] On/Off ⚙
[ ] fixar tasks para a url atual (quando o user fizer isso, as tasks ficarão gravadas só pra aquele link)
[ ] Tasks Gerais, disponíveis para todas as páginas 
	[ ] Fazer um Menu com as Tasks |Página atual|Domínio|Geral|
[ ] Permitir adicionar imagem e som
[ ] configurações globais ou locais [X]
	[ ] adicionar href das config locais
[ ] Config ⚙
	[ ] Alterar teclas de atalho.
		[ ] Ctrl+F10 => Resetar posição do Pop-Up
 

Bugs:
[ ] - Fazer aparecer só uma janela por página 
[ ]	- Usar !important nas cores do pop-up 
		- talvez precise usar em TUDO.
[ ] - eliminar bug de não conseguir arrastar fora da página
 
Desenvolvimento:


Detalhes:
[ ] Botão de Cancel pra o header_title (quando mudar o título)
[ ] Teclas de atalho para
	[ ] apagar task
	[ ] editar task
		[ ] "Esc" Sair sem salvar
		[ ]	"Enter" Salvar alterações
	[ ] criar task
	[ ] resetar cookies
	[ ] reiniciar posição do popUp
	[ ] Abrir config ⚙
		[ ] Sair da config 
			[ ] Cancelar 
			[ ] Salvar alterações
	Bônus:
		[ ] Editar Título 



Bônus: 
[ ] iframe com link oferecido pelo usuário
	[ ] é possível programar um horário para dispach e deixar o pop-up mostrando um iframe de alguma página 
		[ ] Churchofjesuschrist.org -> Escrituras
		[ ] YouTube -> Vídeos em Geral
		//[ ] facebook, pinterest, instagram e redes sociais em geral  -> Autoscroll down (*pensar sobre ideia)
			[ ] Limitar um horário (max 60 min)
			[ ] programar até 4x por dia de aparecer
[ ] notificações de outros apps (Como vou fazer isso? Não faço ideia, só está aí a ideia 🙃)
[ ] Ferramenta de Desenhar nas páginas
[ ] Fechador de link
[ ]Salvar global (não só cookies)	
	[ ] Menu lateral com import de outras páginas.
		[ ] Config [x] Enable menu/disable |||
	Bônus:
		[ ] Login com Google
			Bônus
				[ ] App pra celular (?? será que teria alguma serventia de usar um pop-up?... O mais próximo seria um Google Keep e usar as notificações como o visualizador, ao invés do pop-up)







Lembrete:
[ ] save_task(id){ //Passar todos os cookies para aqui
		if(getCookie("config_save_per_page_4002")=="true"){


*/






/*=====================================================
--------------EXTERNAL SCRIPTS ----------------------
=====================================================
*/
var shortcut = { /*Script with Keyboard Shortcuts*/
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();

		//The function to be called at keypress
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
	
			//Find Which key is pressed
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown

			var keys = shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp = 0;
			
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble = true;
					e.returnValue = false;
	
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},

	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}








// END OF EXTERNAL SCRIPT INLINE============================X






// ---------  Variáveis do Desenvolvedor:
var enable_all_alerts=true;
var bool_Check_path_alert=false;
//var reset_all_Cookies=false;













shortcut.add("Ctrl+F10", function() {
    alert("Ctrl+F10 pressionado! Reiniciando posição do Pop-Up Tasks!");
    document.getElementById('pop_up_4002').style.top="0";
    document.getElementById('pop_up_4002').style.left="0";
});



var reset_all_Cookies =function reset_all_Cookies(){ //Somente os da página


}

// END área do Desenvolvedor --------------------


var getWidth=function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

var getHeight=function getHeight() {
  return Math.max(
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}




var dragElement= function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  console.log("isso:"+document.getElementById(elmnt.id + "header"));
  console.log("isso:"+document.getElementById("pop_up_4002header"));

  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    console.log("height:"+getHeight());
    console.log("top:"+elmnt.offsetTop+"  //pos_new: "+ pos2);
    if(getHeight()>(elmnt.offsetTop - pos2 + elmnt.offsetHeight-10 )&&(elmnt.offsetTop - pos2)>0){    
    	elmnt.style.top = (elmnt.offsetTop - pos2) + "px" ;
	}
    if(getWidth()>(elmnt.offsetLeft - pos1 + elmnt.offsetWidth-10)&&(elmnt.offsetLeft - pos1)>0){
    	elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}else{
    	//elmnt.style.left = (elmnt.offsetLeft - 10) + "px";

	}
	//function(){}
   
  }


  function closeDragElement() {
    // stop moving when mouse button is released:
    createCookie("left_pos",document.getElementById('pop_up_4002').style.left,document.getElementById("config_task_time"),"path=/"+check_path(document.getElementById("config_especific_paths").value));
    createCookie("top_pos",document.getElementById('pop_up_4002').style.top,document.getElementById("config_task_time"),"path=/"+check_path(document.getElementById("config_especific_paths").value));
    document.onmouseup = null;
    document.onmousemove = null;
  }
}






var check_path = function check_path(){
	var all_path = document.getElementById("config_especific_paths");
	var path="";
	if(bool_Check_path_alert && enable_all_alerts){
		console.log("função check_path() ainda à desenvolver");
	}
	return path;
};

var config = function config_open(){
/*

*/

//JANELA


//Botão cookies per page or per domain

//input of domains


// Tempo de expiração dos cookies das TASKS.
};
// Opacity Slider

var getCookie = function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

	
var createCookie = function createCookie(variable,value,exdays,path){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	if(path=="")
	document.cookie = variable + "=" + value + ";" + expires + path;//";path=/";
};


var Done_title_change = function Done_title_change(valor){
	
	createCookie("title_name",valor,1000);


	document.getElementById("header_title").hidden=false;
	document.getElementById("header_title").innerHTML=valor;
	document.getElementById("input_change_title").hidden="true";
	document.getElementById("change_title_Ok").hidden="true";
	document.getElementById("change_title_cancel").hidden="true";

};




//----------------------- NEW |V|


var exit_edit_task=function exit_edit_task(task){
	task.hidden=false;
	document.getElementById('edit_task').remove();

};

var edit_task = function edit_task(task){
	task.hidden='true';
	var input = document.createElement('input');
	input.id='edit_task';
	input.onfocusout='exit_edit_task(task)';
	task.parentNode.insertBefore(input,task);
};

var del_task=function del_task(id){	
		createCookie("num_tasks",num_tasks-1,document.getElementById("config_task_time"),"path=/"+check_path(document.getElementById("config_especific_paths").value));
};




function save_task(id){ //Passar todos os cookies para aqui
	if(getCookie("config_save_per_page_4002")=="true"){
		//setcookie("check",$id, mktime (0, 0, 0, 12, 31, 2015), "/mypath/mypage.php", ".mysite.com"); 

	}else{
		//var num_tasks = getCookie("num_tasks");
		createCookie("id_task_"+toString(id),document.getElementById("id_task_"+toString(id)),document.getElementById("config_task_time"),"path=/"+check_path(document.getElementById("config_especific_paths").value));
	}
};

var load_task = function load_task(i){
	return getCookie("id_task_"+toString(i));		
};


var add_task = function add_task(i) {//icon| --- button drag-and-drop |task-description | Button del
	var div_task = document.createElement("div");

	var id_task = getCookie('id_task_'+toString(i));

	div_task.id=id_task;
	div_task.classList.add("div_task");



	var ico = document.createElement('i');
	ico.classList.add('fas');
	ico.classList.add('fa-tasks');
	ico.style.minWidth="20px";
	ico.classList.add("POINTER");


	var drag = document.createElement('i');
	drag.classList.add('fas');
	drag.style.color="gray";
	drag.classList.add('fa-ellipsis-v');
	drag.style.minWidth="20px";
	drag.classList.add("POINTER");


	
	/*id = id[-1];
	if(id){e

	}else{

	}*/

	//createCookie('id_tasks', JSON.stringify(getCookie('id_task')).push(''),exdays);

	var task = document.createElement('input');	
	var num_tasks=getCookie("num_tasks");
	createCookie("num_tasks",num_tasks+1,document.getElementById("config_task_time").value,check_path());
	task.id = 'task_4002-id_'+toString(contador_num_task("",true));
	task.classList.add('task_4002');
	task.onclick=save_task(num_tasks);
	task.placeholder='...';
	//task.onclick='edit_task(document.getElementById(task.id));';
	task.oninput=save_task(i);

	var x = document.createElement('button');
	x.classList.add('del_button_4002');
	x.classList.add('lni-close');
	x.classList.add('lni');
	x.style.color="red";
	x.inneHTML='X';
	x.on=function(){document.getElementById("add_task_button_4002").disable=false;del_task(document.getElementById("id_task_"+toString(i)));};
	x.background='none';
	x.border='none';

	document.getElementById("div_tasks").appendChild(div_task);
	div_task.appendChild(ico);
	div_task.appendChild(drag);
	div_task.appendChild(task);
	div_task.appendChild(x);
};


var change_title_func = function change_title(){
	document.getElementById("header_title").hidden="true";
	document.getElementById("input_change_title").hidden=false;
	document.getElementById("change_title_Ok").hidden=false;	
	document.getElementById("change_title_cancel").hidden=false;
};


var contador_tasks = function contador_tasks(){
	var num_tasks=0;
	for(var i = 1;i<=10;i++){
		if(getCookie("id_task_"+toString(i))==""){
			return i-1;		
		}
	}
}

var contador_num_task = function contador_num_task(num_tasks,save){

	
	var num_tasks_cookie=getCookie("num_tasks");
	var x = 0;
	if(num_tasks==""){

		x = num_tasks_cookie+1;
	}else{
		x = num_tasks_cookie;
	}
	if(save){
		createCookie("num_tasks",x,document.getElementById("config_task_time"),"path=/"+check_path(document.getElementById("config_especific_paths").value));
	}
	return x;
}

function popUp_create_4002(){

	//console.log(change_title_func);
	var exdays=1000;

	var pop_up = document.createElement("div");

	pop_up.setAttribute("style","max-width:15vw;padding-right:20px;padding-left:20px;   top: 10vh; display: inline-table;width:fit-content;max-height:50vh;height:fit-content;position:fixed; z-index: 999999999;  background: rgba(255,255,255,0.5);  margin: auto; border: 2px solid red;max-width:90vw");
	pop_up.setAttribute("id","pop_up_4002");
	pop_up.style.left=getCookie("left_pos");
    pop_up.style.top=getCookie("top_pos");

	//--------------- logo após criar a pop_up no body

	document.body.appendChild(pop_up);//getElementsByTagName("body")[0]
	
	
	//-------------



	/*var script = document.createElement("script");

	try{
		script.innerHTML=change_title_func+Done_title_change+getCookie+createCookie+config+add_task+edit_task+exit_edit_task+check_path+contador_num_task+contador_tasks;
	}catch(e){
		console.error("Erro de sintaxe na declaração das funções. ErroX0001");
	}*/


    //pop_up.appendChild(script);
	//document.write("<h1 id='is-this-what-you-looking-for'>Hello member</h1>');
	var style = document.createElement("style");
	style.innerHTML="#pop_up_4002{cursor: move;}#button_config{margin-left:8px;margin-rigth:8px;}#pop_up_4002{display:grid;}.div_task{width:100%;display: flex;}#div_tasks>i{text-align: center;}#div_tasks{max-width:max-content}#div_tasks>i:hover{background:rgba(200,200,200,0.5)}.button_4002:hover{background:rgba(200,200,200,0.5)}.button_4002{background:none;border:none}.hover-background:hover{background:rgba(200,200,200,0.5);cursor:pointer;}#header_title:hover{background:rgba(200,200,200,0.5);} .del_button_4002:hover{background:gray;} .background-color {    width: 500px;    height: 500px;    background: red;    opacity: .5;}#div_tasks{width:100%;display:grid;}.POINTER{cursor:pointer}";
	var  script_injection = document.createElement("head4002");
	script_injection.innerHTML ="<link href='https://cdn.lineicons.com/2.0/LineIcons.css' rel='stylesheet'><script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'></script>"; /*o crossdomain está AQUI é o LineIcons, só para os ícones do Pop-UP*/


	//document.getElementById("pop_up_4002").parentNode.insertBefore(script,pop_up);
	document.getElementById("pop_up_4002").parentNode.insertBefore(style,pop_up);

	document.body.parentNode.insertBefore(script_injection,document.getElementsByTagName("body")[0]);



	var header_pu=  document.createElement("div");
	
	header_pu.style.cursor="pointer";
	header_pu.style.display="flex";
	header_pu.setAttribute("id","pop_up_4002header");
	dragElement(document.getElementById("pop_up_4002"));

	pop_up.appendChild(header_pu);

	

	var header_title = document.createElement("p");
	header_title.id="header_title";
	header_title.setAttribute("onclick","change_title();");
	header_title.style.margin="20px auto";
	header_title.style.maxWidth ="50vw";
	header_title.style.minWidth="20px";
	header_title.style.width="max-content";
	header_title.style.height="100%";
	var title = getCookie("title_name");

	if(title==""){
		header_title.innerHTML="Task PopUp";
		
	}else{
		header_title.innerHTML=title;
	}
	header_pu.appendChild(header_title);



	var change_title_input = document.createElement("input");
	change_title_input.setAttribute("id","input_change_title");
	change_title_input.hidden="true";
	header_pu.appendChild(change_title_input);


	var change_title_Ok = document.createElement("button");
	change_title_Ok.setAttribute("id","change_title_Ok");
	change_title_Ok.setAttribute("onclick","Done_title_change(document.getElementById('input_change_title').value)");
	change_title_Ok.hidden="true";	
	change_title_Ok.innerHTML="✔";
	change_title_Ok.style.color="green";
	change_title_Ok.style.background="none";
	change_title_Ok.style.border="none";
	change_title_Ok.style.padding="10px 20px";
	change_title_Ok.style.cursor="pointer";

	header_pu.appendChild(change_title_Ok);



	var change_title_cancel = document.createElement("button");
	change_title_cancel.setAttribute("id","change_title_cancel");
	change_title_cancel.setAttribute("onclick","Done_title_change(getCookie('title_name'));");
	change_title_cancel.hidden="true";	
	change_title_cancel.innerHTML="❌";
	change_title_cancel.style.color="red";
	change_title_cancel.style.background="none";
	change_title_cancel.style.border="none";
	change_title_cancel.style.padding="10px 20px";
	change_title_cancel.style.cursor="pointer";

	header_pu.appendChild(change_title_cancel);


	var caixa_tasks= document.createElement("div");
	caixa_tasks.id="div_tasks";
	pop_up.appendChild(caixa_tasks);


	var caixa_buttons = document.createElement("div");








	var config_pu = document.createElement("div");
	config_pu.id="config_pu";


	var config_task_time=document.createElement("input");

	if(getCookie("config_task_time")==""){
		config_task_time.value=0;
	}else{
		config_task_time.value=getCookie("config_task_time");
	}
	config_task_time.type="number";
	config_task_time.id="config_task_time";
	config_pu.appendChild(config_task_time);
	console.log(config_pu);

	var config_especific_paths = document.createElement("textarea");
	config_especific_paths.id="config_especific_paths";
	config_especific_paths.placeholder="Se tem alguma página em específico que queira separar as tarefas da página com o do domínio principal, cole o link aqui";
	
	config_especific_paths.value=getCookie("config_especific_paths");
	
	config_pu.appendChild(config_especific_paths);
	config_pu.hidden=true;
	pop_up.appendChild(config_pu);



	var button_add_task = document.createElement("button");
	button_add_task.innerHTML="+";
	button_add_task.onclick=add_task(contador_num_task("",false));
	button_add_task.classList.add("button_4002");
	button_add_task.id="add_task_button_4002";
	button_add_task.style.background="none";
	button_add_task.style.border ="none";
	button_add_task.style.fontSize ="25px";
	button_add_task.style.margin="auto";
	button_add_task.style.display="block";
	pop_up.appendChild(button_add_task);




	var button_config = document.createElement("button");
	button_config.id="button_config";
	button_config.setAttribute("value","Config");
	button_config.setAttribute("onclick","config_open()");
	button_config.style.right="0";
	button_config.classList.add("hover-background");

	var icon_button= document.createElement("i");
	icon_button.classList.add("lni");
	icon_button.classList.add("lni-cog");
	icon_button.alt="config";
	button_config.appendChild(icon_button);	



	header_pu.appendChild(button_config);

	button_add_task.onclick=add_task();//Precisa vir depois de existir o "config_especific_paths"


	var id_task = getCookie("id_task_");
	var num_tasks = getCookie("num_tasks");
	add_task(contador_num_task(0,true));
	//document.getElementById("id_task_"+0).value= get(0);

	for(var i = 1;i<=10;i++){
		if(getCookie("id_task_"+toString(i))==""){
			var num_tasks=i-1;
			break;
		}else{
			add_task(i);
		}
	}
	if(num_tasks==9){
		document.getElementById("add_task_button_4002").disable=true;
	}



	console.log("Ok! Pop_Up  created!");
}

window.onload = popUp_create_4002;


/*
JS para o Português.

. -> - (hífen, ex. element-style-margin...)
; -> , (vírgula)
} -> . (ponto final)
{ -> "hey!"/Começar à agir (chamar a atenção ou coisa parecida)

function -> ações
save-file = memória (é igual, com a única diferença que a memória é)
const = conhecimento (aquilo que é fixo, mas podemos usar de seu fruto para outras coisas)
var = assunto temporário em pauta (algo que não é definido, é definido na hora da ação)

(parâmetros) = var = assunto(s) temporário(s) da ação

new -> equivalente à ver algo que não conhece, mas sabe o que fazer, como uma pessoa nova (você sabe que é e o que é uma pessoa, mas essa pessoa é a primeira que vê)


*/



















