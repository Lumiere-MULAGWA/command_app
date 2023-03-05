//-------------------------------------------------------------
//  Nom Document : caisse
//  Auteur       : kazma (Kamel A)
//  Objet        : caisse
//  Creation     : 22.10.2015
//-------------------------------------------------------------
//  Mise a Jour  : 
//-------------------------------------------------------------

//Contrat de licence Creative commons V3.0 de CodeS-SourceS-CommentCaMarche
//Paternité - Pas d'Utilisation Commerciale - Partage des Conditions Initiales à l'Identique 3.0 France

//http://codes-sources.commentcamarche.net/contents/2-informations-de-copyright


var kdeme={

elem:0,
elnav:null,
ctn:null,
tbel:[],
men:0,
contnav:null,

//fonction pour le controle de la position du scroll


marchar:function(){

		var elem=kdeme.elnav.getElementsByTagName('span');

		var hauteur_scroll=document.documentElement.scrollTop || document.body.scrollTop;

		var hauteur_reel=0;

		for (var i=0;i<kdeme.tbel.length;i++){

			var elem_height=kdeme.tbel[i].clientHeight;

			hauteur_reel+=elem_height;

			if(hauteur_scroll<hauteur_reel && hauteur_scroll>=hauteur_reel-elem_height){
				
				kdeme.men=i;
				break;
			}
		}
		
		for (var i=0;i<elem.length;i++){

			if(elem[i].style.color!='white' && elem[kdeme.men] != elem[i]){

				elem[i].style.color='white';

				break;
			}
		}
		elem[kdeme.men].style.color='black';
	},

	
	//fonction qui initialise les elements pour le scroll automatique 
	
	
kasco:function (arg){

		var hauteur_scroll=document.documentElement.scrollTop || document.body.scrollTop;

		kdeme.elem=kdeme.tbel[arg];

		var stile=parseInt(getComputedStyle(kdeme.elem, null).getPropertyValue('margin-top')) + parseInt(getComputedStyle(kdeme.elem, null).getPropertyValue('padding-top'));

		var ddl=(navigator.vendor) ? document.body : document.documentElement;

		ddl.scrollTop=Math.abs(kdeme.elem.offsetTop-stile);

		kdeme.retour();
	},

	
retour:function(){

			var nume=kdeme.contnav;
			nume.style.height=0+'px';
			kdeme.ctn.onclick=kdeme.aller;
	},

aller:function(){

		var nume=kdeme.contnav;

			nume.style.height=kdeme.elnav.offsetHeight+20+'px';
			kdeme.ctn.onclick=kdeme.retour;
	},

	//creation du bandeau et tout ce qu'il contient
	
init:function(){

	var elem=document.getElementsByClassName('face');

	for (var i=0;i<elem.length;i++){

		kdeme.tbel.push(elem[i]);
	}

	kdeme.general=document.createElement('div');
	kdeme.general.setAttribute('class','masthead');

	kdeme.contnav=document.createElement('div');
	kdeme.contnav.setAttribute('class','contnav');

	kdeme.elnav=document.createElement('nav');
	kdeme.elnav.setAttribute('class','scrollnav');

		var tab=document.getElementsByClassName('ktitre');

		for (var i=0;i<tab.length;i++){

		var il=document.createElement('span');
		var txt=tab[i].firstChild.nodeValue;
		var t=document.createTextNode(txt);
		il.appendChild(t);
		il.setAttribute('onclick','kdeme.kasco('+i+')');
		kdeme.elnav.appendChild(il);
		}

	kdeme.contnav.appendChild(kdeme.elnav);
	kdeme.general.appendChild(kdeme.contnav);

	var elemx=document.createElement('div');
	elemx.setAttribute('class','touche');

		var bouton=document.createElement('button');
		bouton.setAttribute('class','bd');
		var tbhtxt=document.createTextNode('categorie');
		bouton.appendChild(tbhtxt);
		bouton.setAttribute('onclick','kdeme.aller()');

		elemx.appendChild(bouton);
		kdeme.ctn=bouton;

		var imp=document.createElement('input');
		imp.setAttribute('id','nb_table');
		imp.setAttribute('readonly','readonly');
		imp.setAttribute('value','cl 1');

		elemx.appendChild(imp);

		var bouton=document.createElement('button');
		bouton.setAttribute('class','bg');
		var tbhtxt=document.createTextNode('client');
		bouton.appendChild(tbhtxt);
		bouton.onclick=function(){aficas('client_cont')};

		elemx.appendChild(bouton);

	kdeme.general.appendChild(elemx);
	document.body.appendChild(kdeme.general);

	document.addEventListener("scroll",kdeme.marchar, false);
	
	kdeme.marchar();
}

}

typeof window.addEventListener == 'undefined' ? attachEvent("onload",kdeme.init) : addEventListener("load",kdeme.init, false);
typeof window.addEventListener == 'undefined' ? attachEvent("onload",addition_init) : addEventListener("load",addition_init, false);


////////:partie caisse//////////////////////////////////////////

var total=0;
var sous_total=0;
var qtt=0;
var element='adition';
var client_element='client1';
var client_total = {};
var client_total_fixe = {};
var client_paiment = {};
var qt_total_client= {};
var client_crash={}
var lautre='';
var nbr_tables=12;

function add(bois) {

	var tb=document.getElementById('tba');
	
	var ok=0;
	
	var el=document.getElementById('tba').getElementsByTagName('td');

	for(var i=0; i<el.length; i++){

		if(el[i].firstChild.nodeValue==bois){

			el[i+1].firstChild.nodeValue=Number(el[i+1].firstChild.nodeValue)+1;
			el[i+2].firstChild.nodeValue=Number(el[i+2].firstChild.nodeValue)+boisson[bois];
			ok=1;
			break;
		}
	}
	if(ok==0){

		var tbr=document.createElement("tr");

		var tbd=document.createElement("td");

		tbd.className='td_bois';
		var tbhtxt=document.createTextNode(bois);
		tbd.appendChild(tbhtxt);
		tbr.appendChild(tbd);

		tbd=document.createElement("td");

		tbd.className='td_qtt';
		tbhtxt=document.createTextNode('1');
		tbd.appendChild(tbhtxt);
		tbr.appendChild(tbd);

		tbd=document.createElement("td");

		tbd.className='td_qtb';
		tbhtxt=document.createTextNode(boisson[bois]);
		tbd.appendChild(tbhtxt);
		tbr.appendChild(tbd);

		tbd=document.createElement("td");

		tbd.className='td_qtsup';
		var btd=document.createElement("button");
		btd.onclick=supp;
		btd.style.color='red';
		tbhtxt=document.createTextNode('*');
		btd.appendChild(tbhtxt)
		tbd.appendChild(btd);
		tbr.appendChild(tbd);

		tb.appendChild(tbr);
	}
	total=Number((boisson[bois]+total)*100)/100;
	sous_total=Number((boisson[bois]+sous_total)*100)/100;
	qtt++;

	document.getElementById('montant').value=sous_total+" \u20ac";
	document.getElementById('quantite').value++;
	document.getElementById('quantite').style.backgroundColor='red';
	setTimeout(function(){document.getElementById('quantite').style.background='#74909A';},300);
}



function valider(){

	var tba=document.getElementById('tba');

	var clone=tba.rows[0].cloneNode(true);
	var clone_b=tba.rows[0].cloneNode(true);
	clone_b.removeChild(clone_b.getElementsByTagName("td")[1]);

	if(tba.rows.length>1){

		var ntb=document.createElement("table");
		ntb.className="aditb";
		ntb.appendChild(clone_b);

		for(var i=1; i<tba.rows.length; i++){

			var qt=Number(tba.rows[i].cells[1].textContent);

			for(var j=0; j<qt; j++){

				var tbr=document.createElement("tr");

				var tbd=document.createElement("td");
				tbd.textContent=tba.rows[i].cells[0].textContent;
				tbr.appendChild(tbd);

				var tbd3=document.createElement("td");
				tbd3.textContent=Number(tba.rows[i].cells[2].textContent)/qt;
				tbr.appendChild(tbd3);

				var tbd4=document.createElement("td");
				tbd4.onclick=supp_facture;
				tbd4.style.color='red';
				tbd4.style.cursor='pointer';
				tbd4.textContent='*'

				tbr.appendChild(tbd4);
				ntb.appendChild(tbr);
				
				qt_total_client[client_element]+=tba.rows[i].cells[0].textContent+",";

				//qt_total_client[client_element]+=Number(tba.rows[i].cells[2].textContent)/qt+",";

			}
		}

		var tbr=document.createElement("tr");
		var tbd=document.createElement("td");
		tbd.setAttribute('colspan','4');
		tbd.style.padding='10px';
		var tbhtxt=document.createTextNode('S/Total: '+sous_total+' \u20ac');
		tbd.appendChild(tbhtxt);
		tbr.appendChild(tbd);
		ntb.appendChild(tbr);

		document.getElementById(client_element).appendChild(ntb);

		client_total[client_element]+=sous_total;
		
		client_total_fixe[client_element]+=sous_total;

		var toto=client_total[client_element];

		if(document.getElementById(client_element+'_tota')){

			document.getElementById(client_element).removeChild(document.getElementById(client_element+'_tota'));

		}
		
		for(var i=1; i<tba.rows.length; i++){

			qttb[tba.rows[i].cells[0].firstChild.nodeValue]+=Number(tba.rows[i].cells[1].firstChild.nodeValue);

			qt_total[tba.rows[i].cells[0].firstChild.nodeValue]+=Number(tba.rows[i].cells[1].firstChild.nodeValue);
		}

		var spn=document.createElement("span");
		spn.setAttribute('class','client_total');
		spn.id=client_element+'_tota';
		var txt=document.createTextNode('Total: '+toto+' \u20ac');
		spn.appendChild(txt);
		document.getElementById(client_element).appendChild(spn);

		document.getElementById(client_element).appendChild(document.getElementById(client_element).querySelector('.ctn_bouton'));

		localStorage.setItem(client_element,document.getElementById(client_element).innerHTML);
		var restore=client_total[client_element]+";"+client_total_fixe[client_element]+";"+client_paiment[client_element]+";"+qt_total_client[client_element];
		
		localStorage.setItem("restore"+client_element,restore);
		
		tba.innerHTML='';
		tba.appendChild(clone);
		qtt=0;
		document.getElementById('quantite').value=0;
		sous_total=0;

		document.getElementById('montant').value=0+" \u20ac";	

	}
	aficas(element);

}

function supp_facture(evt){

	var el=evt.currentTarget.parentNode;
	var px=Number(el.cells[1].firstChild.nodeValue);

	client_total[client_element]-=px;

	evt.currentTarget.onclick='';
	el.style.background="red";
	total-=boisson[el.cells[0].firstChild.nodeValue];
	document.getElementById(client_element+'_tota').textContent='Total: '+client_total[client_element]+' \u20ac';
}


function annuler(){

	var clone=document.getElementById('tba').rows[0].cloneNode(true);
	var clone2=document.getElementById('tba').cloneNode(true);

	document.getElementById('tba').innerHTML='';
	document.getElementById('montant').value=0+" \u20ac";
	document.getElementById('quantite').value=0;
	sous_total=0;
	qtt=0;

	document.getElementById('tba').appendChild(clone);
	document.getElementById(element).style.display='none';

}



function supp(evt){
	var el=evt.currentTarget.parentNode.parentNode;
	var qt=Number(el.cells[1].firstChild.nodeValue);

	if(qt>1){
		el.cells[1].firstChild.nodeValue=qt-1;
		el.cells[2].firstChild.nodeValue=boisson[el.cells[0].firstChild.nodeValue]*(qt-1);

	}
	
	else{

		el.parentNode.removeChild(el);
	}
	total-=boisson[el.cells[0].firstChild.nodeValue];
	sous_total-=boisson[el.cells[0].firstChild.nodeValue];
	qtt--;
	document.getElementById('montant').value=sous_total+" \u20ac";
}


function nouveau(){

	sous_total=0;
	total=0;

	var clone1=document.getElementById(client_element).getElementsByClassName('ctn_bouton')[0];

	document.getElementById(client_element).innerHTML='';
	document.getElementById(client_element).appendChild(clone1);

	var mydate = new Date()
	var mois = mydate.getMonth();
	var jour = mydate.getDate();
	var heures = mydate.getHours();
	var minutes = mydate.getMinutes();

	heures = heures <= 9 ? "0" + heures :heures;
	minutes =minutes <= 9 ? "0" + minutes :minutes;

	var moment=jour+"/"+mois+" "+heures+":"+minutes;

	qt_total_client[client_element]+=client_total_fixe[client_element]+","+client_paiment[client_element]+","+moment
	alert(qt_total_client[client_element])
	client_total[client_element]=0;
	client_total_fixe[client_element]=0;
	client_paiment[client_element]="";
	qt_total_client[client_element]=""
	
	var idx=client_element.substring(client_element.length-1, client_element.length)
	localStorage.setItem('restoreclient'+idx,"");
	localStorage.setItem(client_element,"");
	
	neno();
}


function mode_paiement(mode){

	if(client_paiment[client_element].indexOf(mode)==-1){

		client_paiment[client_element]+=mode;
	}
}


function total_client(){

	aficas(client_element);
	aficas(element);
	aficas('nouveau_suite');
}


function total_jour(){

	var tbj=document.createElement('table');
	tbj.setAttribute('class','tb_total');
	tbj.onclick=function(){tbj.parentNode.removeChild(tbj)}
	var clone=document.getElementById('tba').rows[0].cloneNode(true);
	clone.removeChild(clone.cells[3])
	tbj.appendChild(clone);

	var p_t=0;

	for(clee in qt_total){

		if(qt_total[clee]!= 0){

			var tbr=document.createElement("tr");

			var tbd=document.createElement("td");

			var tbhtxt=document.createTextNode(clee);
			tbd.appendChild(tbhtxt);
			tbr.appendChild(tbd);

			tbd=document.createElement("td");

			var tbhtxt=document.createTextNode(qt_total[clee]);
			tbd.appendChild(tbhtxt);
			tbr.appendChild(tbd);

			tbd=document.createElement("td");

			var tbhtxt=document.createTextNode(boisson[clee]*qt_total[clee]);
			tbd.appendChild(tbhtxt);
			tbr.appendChild(tbd);

			tbj.appendChild(tbr);

			p_t+=boisson[clee]*qt_total[clee];

		}
	}

	var tbr=document.createElement("tr");
	var tbd=document.createElement("td");
	tbd.setAttribute('colspan','3');
	tbd.style.padding='10px';
	var tbhtxt=document.createTextNode('TOTAL: '+p_t+' \u20ac');
	tbd.appendChild(tbhtxt);
	tbr.appendChild(tbd);
	tbj.appendChild(tbr);

	document.body.appendChild(tbj);
	var hauteur_scroll=document.documentElement.scrollTop || document.body.scrollTop;
	tbj.style.top=hauteur_scroll+70+'px';

	aficas('nouveau_suite');

}

function affidition(){

	if(client_total[client_element]!=0){
		aficas(client_element);

		document.body.scrollTop=0;
		document.documentElement.scrollTop=0;

	}
	aficas('nouveau_suite');

};



function choix_client(elem,elem_x,lui){

	document.getElementById('nb_table').value='cl '+elem_x;

	client_element=elem;

	if(lui!=lautre){
		lui.style.background='red';
		lautre.style.background='#623d41';
		lautre=lui;
	}

	document.getElementById('client_cont').style.display='none';
	annuler();

}



function neno(){

	document.getElementById('nouveau_suite').style.display='none';
	document.getElementById(client_element).style.display='none';
	document.getElementById('nouveau_suite').style.display='none';
}



function aficas(param){

	var el=document.getElementById(param);

	if(el.style.display=='none' || el.style.display==''){
		el.style.display='block';
	}
	else{
		el.style.display='none';
	}
}


function addition_init(){

	var addition=document.createElement('div');

	addition.id='adition';

	var cont_montant=document.createElement('div');
	cont_montant.setAttribute('class','cont_montant');

	var inp=document.createElement('input');
	inp.setAttribute('type','text');
	inp.setAttribute('readonly','readonly');
	inp.setAttribute('id','montant');

	cont_montant.appendChild(inp);

	addition.appendChild(cont_montant);

	var annule=document.createElement('div');
	annule.setAttribute('class','annuler');
	var tbhtxt=document.createTextNode('annuler');
	annule.appendChild(tbhtxt);
	annule.onclick=annuler;
	addition.appendChild(annule);

	var tb=document.createElement('table');
	tb.setAttribute('id','tba');

	var tbh=document.createElement('tr');

	var inith=['boisson','qté','px','sup'];

	for(var i=0; i<inith.length; i++){

		var tdth=document.createElement('td');
		tdth.style.fontWeight='bold';
		tdth.style.textAlign='center';
		tdth.style.padding='10px';
		tdth.style.borderStyle='solid';
		tdth.style.borderWidth='0px 0 1px 0';
		var tbhtxt=document.createTextNode(inith[i]);
		tdth.appendChild(tbhtxt);
		tbh.appendChild(tdth);

	}
	tb.appendChild(tbh);
		
	var dv_payment=document.createElement('div');
	dv_payment.className="dv_payment";

	var mode_payment=document.createElement('img');
	mode_payment.src="res/cb.jpg";
	mode_payment.onclick=function(){mode_paiement('Cb')}

	dv_payment.appendChild(mode_payment);

	var mode_payment=document.createElement('img');
	mode_payment.src="res/espece.jpg";
	mode_payment.onclick=function(){mode_paiement('Esp')}

	dv_payment.appendChild(mode_payment);

	var mode_payment=document.createElement('img');
	mode_payment.src="res/tr.jpg";
	mode_payment.onclick=function(){mode_paiement('Tr')}

	dv_payment.appendChild(mode_payment);
	
	addition.appendChild(dv_payment);	
	
	addition.appendChild(tb);

	var valide=document.createElement('button');
	valide.setAttribute('class','valide');
	var tbhtxt=document.createTextNode('valider');
	valide.appendChild(tbhtxt);
	valide.onclick=valider;

	addition.appendChild(valide);

	var cacher=document.createElement('button');
	cacher.setAttribute('class','cacher');
	var tbhtxt=document.createTextNode('cacher');
	cacher.appendChild(tbhtxt);
	cacher.onclick=function(){aficas(element)};

	addition.appendChild(cacher);

	document.body.appendChild(addition);

	var bandeau=document.createElement('div');
	bandeau.setAttribute('class','bandeau_bas');

	var bouton=document.createElement('button');
	bouton.setAttribute('class','bg');
	var tbhtxt=document.createTextNode('menu');
	bouton.appendChild(tbhtxt);
	bouton.onclick=function(){aficas('nouveau_suite')};
	bandeau.appendChild(bouton);

	var imp=document.createElement('input');
	imp.setAttribute('id','quantite');
	imp.setAttribute('readonly','readonly');
	imp.setAttribute('value','0');
	bandeau.appendChild(imp);

	var bouton=document.createElement('button');
	bouton.setAttribute('class','bd');
	var tbhtxt=document.createTextNode('commande');
	bouton.appendChild(tbhtxt);

	bouton.onclick=function(){
		aficas(element);
		var hauteur_scroll=document.documentElement.scrollTop || document.body.scrollTop;
		document.getElementById(element).style.top=hauteur_scroll+30+'px';};

	bandeau.appendChild(bouton);

	document.body.appendChild(bandeau);

	var suite=document.createElement('div');
	suite.setAttribute('id','nouveau_suite');

	var bouton=document.createElement('button');
	bouton.setAttribute('class','bh');
	var tbhtxt=document.createTextNode('addition');
	bouton.appendChild(tbhtxt);
	bouton.onclick=affidition;
	suite.appendChild(bouton);

	var bouton=document.createElement('button');
	bouton.setAttribute('class','bb');
	var tbhtxt=document.createTextNode('session');
	bouton.appendChild(tbhtxt);
	bouton.onclick=total_jour;
	suite.appendChild(bouton);

	document.body.appendChild(suite);
	
	var etat_restore=false;
	
	if(confirm("restaurer session precedente")){
		
		etat_restore=true;		
	}

	if(etat_restore){
		
		for(var i=1;i<nbr_tables+1;i++){
			
			if(localStorage.getItem('client'+i) && localStorage.getItem('client'+i)!=""){
				
				addition_restore(i);
			}

			else{
				addition_vide(i);
			}		
		}
	}

	else{
		
		for(var i=1;i<nbr_tables+1;i++){
			
			addition_vide(i)	
		}
		var idx=client_element.substring(client_element.length-1, client_element.length)
		localStorage.setItem('restoreclient'+idx,"");
		localStorage.setItem(client_element,"");
	}
	
	var client_cont=document.createElement('div');
		client_cont.setAttribute('id','client_cont');
	
	for(var i=1;i<nbr_tables+1;i++){

		var client_c=document.createElement('div');

		client_c.setAttribute('class','client_c');

		var tbhtxt=document.createTextNode(i);
		client_c.appendChild(tbhtxt);

		client_c.setAttribute('onclick','choix_client("client'+i+'",'+i+',this)');

		if(i==1){
			lautre=client_c;
			client_c.style.background='red';
		}
		client_cont.appendChild(client_c);
	}
	document.body.appendChild(client_cont);
}


function addition_restore(i){

	var client=document.createElement('div');

	client.setAttribute('id','client'+i);
	client.setAttribute('class','client');

	client.innerHTML=localStorage.getItem('client'+i);
	
	var dt=client.getElementsByTagName("td");
	
	for(var j=0;j<dt.length;j++){
		
		if(dt[j].textContent=='*'){
			
			dt[j].onclick=supp_facture;
		}
	}
	
	document.body.appendChild(client);

	var el=document.getElementById('client'+i).querySelector('.dv_payment');

	el.getElementsByTagName("img")[0].onclick=function(){mode_paiement('Cb')}
	el.getElementsByTagName("img")[1].onclick=function(){mode_paiement('Esp')}
	el.getElementsByTagName("img")[2].onclick=function(){mode_paiement('Tr')}

	document.getElementById('client'+i).querySelector('.bag').onclick=nouveau;

	document.getElementById('client'+i).querySelector('.bad').onclick=function(){this.parentNode.parentNode.style.display='none';};

	var tb_restore=localStorage.getItem('restoreclient'+i).split(";");

	client_total['client'+i] = parseFloat(tb_restore[0]);
	client_total_fixe['client'+i] = parseFloat(tb_restore[1]);
	client_paiment['client'+i] = tb_restore[2];
	qt_total_client['client'+i]= tb_restore[3];

}


function addition_vide(i){

	var client=document.createElement('div');

	client.setAttribute('id','client'+i);
	client.setAttribute('class','client');

	var ctn_bouton=document.createElement('div');
	ctn_bouton.className="ctn_bouton";

	var dv_payment=document.createElement('div');
	dv_payment.className="dv_payment";

	var mode_payment=document.createElement('img');
	mode_payment.src="res/cb.jpg";
	mode_payment.onclick=function(){mode_paiement('Cb')}

	dv_payment.appendChild(mode_payment);

	var mode_payment=document.createElement('img');
	mode_payment.src="res/espece.jpg";
	mode_payment.onclick=function(){mode_paiement('Esp')}

	dv_payment.appendChild(mode_payment);

	var mode_payment=document.createElement('img');
	mode_payment.src="res/tr.jpg";
	mode_payment.onclick=function(){mode_paiement('Tr')}

	dv_payment.appendChild(mode_payment);

	ctn_bouton.appendChild(dv_payment);


	var bouton=document.createElement('button');
	bouton.setAttribute('class','bag');
	var tbhtxt=document.createTextNode('clore');
	bouton.appendChild(tbhtxt);
	bouton.onclick=nouveau;
	ctn_bouton.appendChild(bouton);

	var bouton=document.createElement('button');
	bouton.setAttribute('class','bad');
	var tbhtxt=document.createTextNode('fermer');
	bouton.appendChild(tbhtxt);
	bouton.onclick=function(){this.parentNode.parentNode.style.display='none';};
	ctn_bouton.appendChild(bouton);

	client.appendChild(ctn_bouton);

	document.body.appendChild(client);

	client_total['client'+i] = 0;
	client_total_fixe['client'+i] = 0;
	client_paiment['client'+i] = "";
	qt_total_client['client'+i]="";
}