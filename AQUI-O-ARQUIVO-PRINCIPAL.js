// ==UserScript==
// @name           A task PopUp [~developing]
// @description    Yours Tasks in POP-UP! Using JQuery & JS. 
// @author         Marlon Rebello Viana
// @include        https://*
// @version        1.0
// ==/UserScript==


/*
Coisas à fazer:


Fundamentais:
[ ] Colocar Data e hora nas tasks
[ ] Despertador
[ ] Cronômetro
[ ] Timer
[ ] Minimizar/abrir --- [ ] X 
[ ] Aumentar ou diminuir Caixa
	[ ] Config - [x] On/Off

Desenvolvimento:


Detalhes:
[ ] Botão de Cancel pra o header_title (quando mudar o título)




Bônus: 
[ ] Fechador de link
[ ]Salvar global (não só cookies)	
	[ ] Menu lateral com import de outras páginas.
		[ ] Config [x] Enable menu/disable |||
	Bônus:
		[ ] Login com Google
			Bônus
				[ ] App pra celular (?? será que teria alguma serventia de usar um pop-up?... O mais próximo seria um Google Keep e usar as notificações como o visualizador, ao invés do pop-up)



*/
function config(){

}
// Opacity Slider

function getCookie(cname) {
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
}

	
function createCookie(variable,value,exdays){
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = variable + "=" + value + ";" + expires + ";path=/";
}

function Done_title_change(valor){
	
	createCookie("title_name",valor,1000);


	document.getElementById("header_title").hidden=false;
	document.getElementById("header_title").innerHTML=valor;
	document.getElementById("input_change_title").hidden="true";
	document.getElementById("change_title_Ok").hidden="true";
	document.getElementById("change_title_cancel").hidden="true";

}

function change_title(){
	document.getElementById("header_title").hidden="true";
	document.getElementById("input_change_title").hidden=false;
	document.getElementById("change_title_Ok").hidden=false;	
	document.getElementById("change_title_cancel").hidden=false;
}



//----------------------- NEW |V|


function exit_edit_task(task){
	task.hidden=false;
	document.getElementById('edit_task').remove();

}

function edit_task(task){
	task.hidden='true';
	var input = document.createElement('input');
	input.id='edit_task';
	input.onfocusout='exit_edit_task(task)';
	task.parentNode.insertBefore(input,task);
}

function add_task() {//icon| --- button drag-and-drop |task-description | Button del

	var div = document.createElement('div');
	div.id='div_tasks';
	div.style.width='100%';
	div.style.margin='auto';


	var ico = document.createElement('i');
	ico.classList.add('fas');
	ico.classList.add('fa-tasks');

	var drag = document.createElement('i');
	drag.classList.add('fas');
	drag.classList.add('fa-ellipsis-v');




	var id_tasks = JSON.parse(getCookie('id_task')).push('');


	/*id = id[-1];
	if(id){

	}else{

	}*/

	createCookie('id_tasks', JSON.stringify(getCookie('id_task')).push(''),exdays);

	var task = document.createElement('input');			
	task.id = 'task_4002'+toString(id_tasks.length);
	task.classList.add('task_4002');
	task.placeholder=toString(id_tasks.length)+'...';
	task.onclick='edit_task(document.getElementById(task.id));';


	var x = document.createElement('button');
	x.classList.add('del_button_4002');
	x.inneHTML='X';
	x.background='none';
	x.border='none';

	document.getElementById('div_tasks').appendChild(ico);
	document.getElementById('div_tasks').appendChild(drag);
	document.getElementById('div_tasks').appendChild(id_tasks);
	document.getElementById('div_tasks').appendChild(x);
	//edit_task(task);
}


function popUp_create_4002(id_tasks){


	var exdays=1000;

	var pop_up = document.createElement("div");

	pop_up.setAttribute("style","max-width:15vw;padding-right:20px;padding-left:20px;   top: 10vh; display: inline-table;width:fit-content;max-height:50vh;height:fit-content;position:fixed; z-index: 999999999;  background: rgba(255,255,255,0.5);  margin: auto;    border: 2px solid red;");
	pop_up.setAttribute("id","pop_up_4002");


	document.getElementsByTagName("body")[0].appendChild(pop_up);


	var script = document.createElement("script");
	script.innerHTML='function config(){}function getCookie(e){for(var t=e+"=",n=decodeURIComponent(document.cookie).split(";"),d=0;d<n.length;d++){for(var i=n[d];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(t))return i.substring(t.length,i.length)}return""}function createCookie(e,t,n){var d=new Date;d.setTime(d.getTime()+24*n*60*60*1e3);d="expires="+d.toUTCString();document.cookie=e+"="+t+";"+d+";path=/"}function Done_title_change(e){createCookie("title_name",e,1e3),document.getElementById("header_title").hidden=!1,document.getElementById("header_title").innerHTML=e,document.getElementById("input_change_title").hidden="true",document.getElementById("change_title_Ok").hidden="true",document.getElementById("change_title_cancel").hidden="true"}function change_title(){document.getElementById("header_title").hidden="true",document.getElementById("input_change_title").hidden=!1,document.getElementById("change_title_Ok").hidden=!1,document.getElementById("change_title_cancel").hidden=!1}function exit_edit_task(e){e.hidden=!1,document.getElementById("edit_task").remove()}function edit_task(e){e.hidden="true";var t=document.createElement("input");t.id="edit_task",t.onfocusout="exit_edit_task(task)",e.parentNode.insertBefore(t,e)}function add_task(){var t=document.createElement("div");t.id="div_tasks",t.style.width="100%",t.style.margin="auto";var n=document.createElement("i");n.classList.add("fas"),n.classList.add("fa-tasks");var d=document.createElement("i");d.classList.add("fas"),d.classList.add("fa-ellipsis-v");var i=JSON.parse(getCookie("id_task")).push("");createCookie("id_tasks",JSON.stringify(getCookie("id_task")).push(""),exdays);t=document.createElement("input");t.id="task_4002"+toString(i.length),t.classList.add("task_4002"),t.placeholder=toString(i.length)+"...",t.onclick="edit_task(document.getElementById(task.id));";t=document.createElement("button");t.classList.add("del_button_4002"),t.inneHTML="X",t.background="none",t.border="none",document.getElementById("div_tasks").appendChild(n),document.getElementById("div_tasks").appendChild(d),document.getElementById("div_tasks").appendChild(i),document.getElementById("div_tasks").appendChild(t)}';

	//document.write("<h1 id='is-this-what-you-looking-for'>Hello member</h1>");
	var style = document.createElement("style");
	style.innerHTML="button{background:none;border:none}.hover-background:hover{background:rgba(200,200,200,0.5);cursor:pointer;}#header_title:hover{background:rgba(200,200,200,0.5);} .del_button_4002:hover{background:gray;} .background-color {    width: 500px;    height: 500px;    background: red;    opacity: .5;}";
	var  script_injection = document.createElement("head4002");
	script_injection.innerHTML ="<link href='https://cdn.lineicons.com/2.0/LineIcons.css' rel='stylesheet'><script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'></script>"; /*o crossdomain está AQUI é o LineIcons, só para os ícones do Pop-UP*/



	document.getElementById("pop_up_4002").parentNode.insertBefore(script,pop_up);
	document.getElementById("pop_up_4002").parentNode.insertBefore(style,pop_up);

	document.getElementsByTagName("head")[0].parentNode.insertBefore(script_injection,document.getElementsByTagName("body")[0]);


	var header_pu=  document.createElement("div");
	
	header_pu.style.cursor="pointer";
	header_pu.style.display="flex";
	header_pu.setAttribute("id","cabecalho_4002");
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
	console.log(title);
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
	change_title_cancel.setAttribute("onclick","Done_title_change(getCookie('title_name'))");
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


	var button_add_task = document.createElement("button");
	button_add_task.innerHTML="+";
	button_add_task.onclick="add_task();";
	button_add_task.style.background="none";
	button_add_task.style.border ="none";
	button_add_task.style.fontSize="10px";
	caixa_buttons.appendChild(button_add_task);



	var config_pu = document.createElement("div");



	var config_button = document.createElement("button");
	config_button.setAttribute("value","Config");
	config_button.setAttribute("onclick","config()");
	config_button.style.right="0";
	config_button.classList.add("hover-background");

	var icon_button= document.createElement("i");
	icon_button.classList.add("lni");
	icon_button.classList.add("lni-cog");
	icon_button.alt="config";
	config_button.appendChild(icon_button);	



	header_pu.appendChild(config_button);


	var id_tasks= getCookie("id_tasks");
	if(id_tasks!=undefined){
		add_task();
	}else{//new task
		add_task();
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






window-load

*/