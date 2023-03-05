//-------------------------------------------------------------
//  Nom Document : generateur
//  Auteur       : kazma
//  Objet        : generateur   http://www.javascriptfr.com/
//  Création     : 27.10.2015
//-------------------------------------------------------------

//Contrat de licence Creative commons V3.0 de CodeS-SourceS-CommentCaMarche
//Paternité - Pas d'Utilisation Commerciale - Partage des Conditions Initiales à l'Identique 3.0 France

//http://codes-sources.commentcamarche.net/contents/2-informations-de-copyright

var tbid = [];
var tbcategorie =[];
var tbimage =[];
var tbprix =[];
var tbcat=[];
var tbinit =[];

var dvr='vide';
var modi='';
var modicat='';
var le='vide';

var demo="cafe,petit chocolat,grand chocolat,cola,orangina,diabolo grenadine,jus orange,diabolo fraise,diabolo fraise,diabolo grenadine,diabolo ananas,diabolo menthe,diabolo cassis,biere pression,tango (biere grenadine),tourtel,bava,perroquet (biere menthe),whisko,whisko dbl,eau plate,get 0,sirop anis,1,1,2,2,2,2,2.5,2,2,2,2,2,2,2,3,3,3.5,3,3,3,3,3,3,habituel,habituel,habituel,habituel,habituel,habituel,habituel,habituel,limonade,limonade,limonade,limonade,limonade,biere sans alcool,biere sans alcool,biere sans alcool,biere sans alcool,biere sans alcool,factice,factice,factice,factice,factice,cafe.png,petit_chocolat.png,grand_chocolat.png,cola.png,orangina.png,diabolo_grenadine.png,jus_orange.png,diabolo_fraise.png,diabolo_fraise.png,diabolo_grenadine.png,diabolo_ananas.png,diabolo_menthe.png,diabolo_cassis.png,biere.png,tango.png,citron.png,bava.png,perroquet.png,whisky.png,whisky_dbl.png,eau.png,get_0.png,anis.png"

function ajouter(){

	var ts=document.getElementById('tabsee');

	var valeur=document.getElementById('boisson').value;
	var valeur2=document.getElementById('prix').value;
	var valeur3=document.getElementById('categorie').value;
	var valeur4=document.getElementById('image').value;
	
	for(var i=0;i<tbid.length;i++){	
		if(valeur==tbid[i]){
			var choix=confirm("ce nom existe déja voulez vous continué ? \n \n nom existant: "+tbid[i]+"  "+tbprix[i]+"€; "+tbcategorie[i]+"; "+tbimage[i]);
			break;
		}
	}
	if(choix==false){
		return false;
	}

	if(valeur==''){
		kodal.erreur(document.getElementById('boisson'),'aucunes valeurs entrées');
		return false;
	}
	
	if(valeur2==''){
		kodal.erreur(document.getElementById('prix'),'aucunes valeurs entrées');
		return false;
	}

	if(isNaN(valeur2)){
		kodal.erreur(document.getElementById('prix'),"la valeur entrée n'est pas un chiffre valide");
		return false;
	}

	if(valeur3 ==''){
		kodal.erreur(document.getElementById('categorie'),'aucunes valeurs entrées');
		return false;
	}

	if(valeur4==''){
		kodal.erreur(document.getElementById('image'),'aucunes valeurs entrées');
		return false;
	}


	var compteur=0;
	
	for(var i=0;i<tbcat.length;i++){

		if(valeur3==tbcat[i]){
			compteur=1;
			break;
		}
	}

	if(compteur==0){

		tbcat.push(valeur3)

		var cc=document.createElement('div');
		cc.setAttribute('class','categ');
		cc.setAttribute('draggable','true');
		var texte=document.createTextNode(valeur3);
		cc.appendChild(texte);
		cc.addEventListener('dragstart', drag, false);
		cc.addEventListener('drop', droper, false);
		cc.ondragover=function(){return false}
		document.getElementById('categ').appendChild(cc);

		var dd=document.createElement('li');
		var dv=document.createElement('div');
		var texte=document.createTextNode(valeur3);
		dv.appendChild(texte);
		dv.setAttribute("onclick","element_categorie('"+valeur3+"')");
		dd.appendChild(dv);
		document.getElementById('chx_catego').appendChild(dd);
		dd.parentNode.style.overflow='auto';

	}
	
	tbid.push(valeur);
	tbprix.push(valeur2);
	tbcategorie.push(valeur3);
	tbimage.push(valeur4);

	tabinsert(valeur,valeur2,valeur3,valeur4);
	//document.getElementById('test1').value='';
}



function tabinsert(valeur,valeur2,valeur3,valeur4){

	var ts=document.getElementById('tabsee');
	ts.onclick=valid_deplacer;

	ts.insertRow(-1);
	var nbrow=ts.rows.length-1;

	ts.rows[nbrow].insertCell(0);
	ts.rows[nbrow].cells[0].appendChild(document.createTextNode(valeur));
	ts.rows[nbrow].cells[0].setAttribute('class','tdboisson');


	ts.rows[nbrow].insertCell(1);
	ts.rows[nbrow].cells[1].appendChild(document.createTextNode(valeur2));
	ts.rows[nbrow].cells[1].setAttribute('class','tdprix');	

	ts.rows[nbrow].insertCell(2);
	ts.rows[nbrow].cells[2].appendChild(document.createTextNode(valeur3));
	ts.rows[nbrow].cells[2].setAttribute('class','tdcategorie');	


	ts.rows[nbrow].insertCell(3);
	ts.rows[nbrow].cells[3].appendChild(document.createTextNode(valeur4));
	ts.rows[nbrow].cells[3].setAttribute('class','tdimage');	


	ts.rows[nbrow].insertCell(4);
	var cc=document.createElement('input');
	cc.type='button';
	cc.onclick=modifier
	ts.rows[nbrow].cells[4].appendChild(cc);
	ts.rows[nbrow].cells[4].setAttribute('class','tdmodif');
	
	ts.rows[nbrow].insertCell(5);
	var cc=document.createElement('input');
	cc.type='checkbox';
	ts.rows[nbrow].cells[5].appendChild(cc);
	ts.rows[nbrow].cells[5].setAttribute('class','tdsup');

}


var ordre=true;
var eldep=[];

function deplace_cat(e){
	
	document.getElementById('ct_cat').style.display="block";
}

var lel

function drag(e){

	var lui=e.currentTarget;
	lel=lui;
	var val_le=lui.firstChild.nodeValue;
	e =(!e) ? window.event : e;
	e.dataTransfer.setData("text/plain", val_le);
	e.dataTransfer.effectAllows = 'move';
}


function droper(e){

	e.preventDefault();
	var obj = e.currentTarget;
	
	var val_le = e.dataTransfer.getData("text/plain");

	obj.parentNode.insertBefore(lel,obj);
}


function valid_cat(){
	
	var all=document.getElementById('categ').getElementsByTagName("div");

	for(var i=1;i<all.length;i++){
		tbcat[i]=all[i].textContent
	
	}
	
	
	for(var i=0;i<tbcat.length;i++){

		for(var h=tbcategorie.length-1;h>=0;h--){

			if(tbcat[i]==tbcategorie[h]){

				var val1=tbcategorie.splice(h,1);
				var val2=tbimage.splice(h,1);
				var val3=tbprix.splice(h,1);
				var val4=tbid.splice(h,1);

				tbcategorie.push(val1);
				tbimage.push(val2);
				tbprix.push(val3);
				tbid.push(val4);
			}
		}
	}
	
	document.getElementById('ct_cat').style.display="none";
	document.getElementById('categ').innerHTML=''
	orde();
	
}


function anu_cat(){
	
	document.getElementById('ct_cat').style.display="none";
	document.getElementById('categ').innerHTML=''
	
	for(var h=0;h<tbcat.length;h++){

		var cc=document.createElement('div');
		cc.setAttribute('class','categ');
		cc.setAttribute('draggable','true');
		var texte=document.createTextNode(tbcat[h]);
		cc.appendChild(texte);
		cc.addEventListener('dragstart', drag, false);
		cc.addEventListener('drop', droper, false);
		cc.ondragover=function(){return false}
		document.getElementById('categ').appendChild(cc);

	}
}




var tbid_cat = [];
var tbcategorie_cat =[];
var tbimage_cat =[];
var tbprix_cat =[];
var x_chx_categ=0

function element_categorie(chx_categ){

	document.getElementById('ct_el_cat').style.display="block";

	var ts=document.getElementById('dv_el_cat');
	ts.innerHTML="";
	
	x_chx_cate=chx_categ;
	
	for (var i=0;i<tbcategorie.length; i++){

		if(tbcategorie[i]==chx_categ){
		
			tbid_cat.push(tbid[i]);
			tbcategorie_cat.push(tbcategorie[i]);
			tbimage_cat.push(tbimage[i]);
			tbprix_cat.push(tbprix[i]);
			
			var cc=document.createElement('div');
			cc.setAttribute('class','categ');
			cc.setAttribute('draggable','true');
			var texte=document.createTextNode(tbid[i]);
			cc.appendChild(texte);
			cc.addEventListener('dragstart', element_drag, false);
			cc.addEventListener('drop', element_droper, false);
			cc.ondragover=function(){return false};
			ts.appendChild(cc);
		}
	}
}



function element_drag(e){

	var lui=e.currentTarget;
	lel=lui;
	var val_le=lui.firstChild.nodeValue;
	e =(!e) ? window.event : e;
	e.dataTransfer.setData("text/plain", val_le);
	e.dataTransfer.effectAllows = 'move';
}


function element_droper(e){

	e.preventDefault();
	var obj = e.currentTarget;
	var valure=obj.firstChild.nodeValue;
	var val_le = e.dataTransfer.getData("text/plain");

	obj.parentNode.insertBefore(lel,obj);

	for(var h=0;h<tbid_cat.length;h++){
		if(tbid_cat[h]==val_le){
		var di=	tbid_cat.splice(h, 1);
		var cat=tbcategorie_cat.splice(h, 1);
		var igm=tbimage_cat.splice(h, 1);
		var prx=tbprix_cat.splice(h, 1);
			break;
		}
	}

	for(var h=0;h<tbid_cat.length;h++){
		if(tbid_cat[h]==valure){
			tbid_cat.splice(h,0,di);
			tbcategorie_cat.splice(h,0,cat);
			tbimage_cat.splice(h,0,igm);
			tbprix_cat.splice(h,0,prx);
			break;
		}
	}
}


function valid_elem_categ(){

	var increment=0;
	
	for(var i=0;i<tbcategorie.length;i++){

		if(tbcategorie[i]==x_chx_cate){
	
				tbid.splice(i,1,tbid_cat[increment]);
				tbcategorie.splice(i,1,tbcategorie_cat[increment]);
				tbimage.splice(i,1,tbimage_cat[increment]);
				tbprix.splice(i,1,tbprix_cat[increment]);
				increment++;
		}
	}
	
	var taille=tbid_cat.length;
	
	tbid_cat.splice(0,taille);
	tbcategorie_cat.splice(0,taille);
	tbimage_cat.splice(0,taille);
	tbprix_cat.splice(0,taille);

	document.getElementById('ct_el_cat').style.display="none";
	
}

function anu_el_cat(){

	var taille=tbid_cat.length;
	
	tbid_cat.splice(0,taille);
	tbcategorie_cat.splice(0,taille);
	tbimage_cat.splice(0,taille);
	tbprix_cat.splice(0,taille);

	document.getElementById('ct_el_cat').style.display="none";

}



function valid_deplacer(e){

	if (ordre==false){
		return false;
	}

	if(eldep.length>0 && e.target.type!='button'){

		eldep.reverse();

		for (var i=eldep.length-1;i>=0;i--){
			e.target.parentNode.parentNode.insertBefore(eldep[i],e.target.parentNode);
			eldep[i].style.background='none';
			eldep.pop();
		}
	}
}


function supp(){

	var ts=document.getElementById('tabsee');
	var iii=0;

	while (iii<ts.rows.length){

		if(ts.rows[iii].cells[5].childNodes[0].checked){

			el=ts.rows[iii];

			var valeur=el.cells[0].firstChild.nodeValue;
			var valeur3=el.cells[2].firstChild.nodeValue;

			for(var i = 0 ; i < tbid.length; i++){

				if(tbid[i]==valeur && tbcategorie[i]==valeur3){

					tbid.splice(i,1);
					tbcategorie.splice(i,1);
					tbimage.splice(i,1);
					tbprix.splice(i,1);
					break;
				}
			}

			ts.deleteRow(iii);

			iii--;
		}
		iii++;
	}



	for(var i=0;i<tbcat.length;i++){

		for(var j=0;j<tbcategorie.length;j++){

			if(tbcat[i]==tbcategorie[j]){
				break;
			}
			if(j==tbcategorie.length-1 && tbcategorie[j]!=tbcat[i]){
				
				var elcat=tbcat[i];
				tbcat.splice(i,1);
				
				var all=document.getElementById('categ').getElementsByTagName("div");
			
				for(var j=0;j<all.length;j++){
					
					if(all[j].textContent==elcat){
						all[j].parentNode.removeChild(all[j]);
						break;
					}
				}

				var all=document.getElementById('chx_catego').getElementsByTagName("div");
				
				for(var j=0;j<all.length;j++){
					
					if(all[j].textContent==elcat){
						all[j].parentNode.parentNode.removeChild(all[j].parentNode);
						break;
					}
				}

				break;
			}
		}

	}
}



function modifier(evt){

	var el=evt.target.parentNode.parentNode;

	if(le!='vide'){

		valid_modif();
	}

	le=el;

	modi=el.cells[0].firstChild.nodeValue;
	modicat=el.cells[2].firstChild.nodeValue;

	for(var i=0;i<el.cells.length-2;i++){

		var cc=document.createElement('input');
		cc.style.width='90%';

		var texte=el.cells[i].firstChild.nodeValue;
		cc.type='texte';
		cc.setAttribute('value',texte);
		el.cells[i].innerHTML=''
		el.cells[i].appendChild(cc);
	}

	el.cells[4].firstChild.onclick=valid_modif;
	el.cells[4].firstChild.style.color='red';
	el.cells[4].firstChild.value='V';

}

function valid_modif(evt){

	var el=le;

	var valeur=el.cells[0].firstChild.value;
	var valeur2=el.cells[1].firstChild.value;
	var valeur3=el.cells[2].firstChild.value;
	var valeur4=el.cells[3].firstChild.value;

	el.cells[4].firstChild.onclick=modifier;

	for(var i = 0 ; i < tbid.length; i++){

		if(tbid[i]==modi && tbcategorie[i]==modicat){

			tbcategorie[i]=valeur3;

			le.cells[2].innerHTML='';
			le.cells[2].appendChild(document.createTextNode(valeur3));
			break;
		}
	}

	for(var i = 0 ; i < tbid.length; i++){

		if(tbid[i]==modi){

			tbid[i]=valeur;
			tbprix[i]=valeur2;
			tbimage[i]=valeur4;

			le.cells[0].innerHTML='';
			le.cells[0].appendChild(document.createTextNode(valeur));
			le.cells[1].innerHTML='';
			le.cells[1].appendChild(document.createTextNode(valeur2));
			le.cells[3].innerHTML='';
			le.cells[3].appendChild(document.createTextNode(valeur4));

		}
	}
	el.cells[4].firstChild.value='';
	le='vide';

	var compteur=0;
	
	for(var i=0;i<tbcat.length;i++){

		if(valeur3==tbcat[i]){
			compteur=1;
			break;
		}
	}

	if(compteur==0){

		tbcat.push(valeur3)

		var cc=document.createElement('div');
		cc.setAttribute('class','categ');
		cc.setAttribute('draggable','true');
		var texte=document.createTextNode(valeur3);
		cc.appendChild(texte);
		cc.addEventListener('dragstart', drag, false);
		cc.addEventListener('drop', droper, false);
		cc.ondragover=function(){return false}
		document.getElementById('categ').appendChild(cc);

		var dd=document.createElement('li');
		var dv=document.createElement('div');
		var texte=document.createTextNode(valeur3);
		dv.appendChild(texte);
		dv.setAttribute("onclick","element_categorie('"+valeur3+"')");
		dd.appendChild(dv);
		document.getElementById('chx_catego').appendChild(dd);
		dd.parentNode.style.overflow='auto';

	}

	var compteur=0

	for(var i=0;i<tbcat.length;i++){

		for(var j=0;j<tbcategorie.length;j++){

			if(tbcat[i]==tbcategorie[j]){
				break;
			}
			if(j==tbcategorie.length-1 && tbcategorie[j]!=tbcat[i]){

				var elcat=tbcat[i];
				tbcat.splice(i,1);

				var all=document.getElementById('categ').getElementsByTagName("div");

				for(var k=0;k<all.length;k++){

					if(all[k].textContent==elcat){
						all[k].parentNode.removeChild(all[k]);
						break;
					}
				}

				var all=document.getElementById('chx_catego').getElementsByTagName("div");

				for(var k=0;k<all.length;k++){

					if(all[k].textContent==elcat){
						all[k].parentNode.parentNode.removeChild(all[k].parentNode);
						break;
					}
				}
				break;
			}
		}
	}
}

var tbvieux=[]

function renome_categ(){

	if(document.getElementById('ctn_renome_cat').innerHTML==''){
		
		for(var i=0;i<tbcat.length;i++){

			var dv=document.createElement('input');
			dv.value=tbcat[i];
			dv.style.margin="5px";
			document.getElementById('ctn_renome_cat').appendChild(dv);
			
			tbvieux.push(tbcat[i])
		}
		document.getElementById('renome_cat').style.display="block";
	}
	
	
}


function valide_renome(){

	var all=document.getElementById('ctn_renome_cat').getElementsByTagName("input");

	for(var i=0;i<tbcat.length;i++){

		tbcat[i]=all[i].value;

		for(var j=0;j<tbcategorie.length;j++){

			if(tbcategorie[j]==tbvieux[i]){
				tbcategorie[j]=tbcat[i];

			}
		}
	}
	

	var ts=document.getElementById('tabsee');

	for(var j=0;j<ts.rows.length;j++){
		
		ts.rows[j].cells[2].textContent=tbcategorie[j]
		
	}
	
	
	tbvieux.splice(0,tbvieux.length)
	
	document.getElementById('ctn_renome_cat').innerHTML='';
	document.getElementById('renome_cat').style.display="none";
	document.getElementById('chx_catego').innerHTML='';
	document.getElementById('categ').innerHTML='';
	maj_mod_cat();
}

function anu_mod_cat(){
	
	document.getElementById('ctn_renome_cat').innerHTML='';
	document.getElementById('renome_cat').style.display="none";	

}


function sortTable(col){
	var mybody=document.getElementById('tabsee');
	var lines=mybody.getElementsByTagName('tr');
	var sorter=[];
	sorter.length=0;
	var i=-1;
	while(lines[++i]){
		sorter.push([lines[i],lines[i].getElementsByTagName('td')[col].innerHTML]);
	}
	sorter.sort();
	j=-1;
	var table=document.getElementById('tabsee').cloneNode(false)
	while(sorter[++j]){
		table.appendChild(sorter[j][0]);
	}
	document.getElementById('tabsee').parentNode.replaceChild(table,document.getElementById('tabsee'))

	ordre=false;
}


function creahtml(){

	var x='';
	var zero='';
	var qt_total='';

	for(var i = 0 ; i < tbid.length; i++){

		if(i < tbid.length-1){

			x+="'"+tbid[i]+"':"+tbprix[i]+",";
			zero+="'"+tbid[i]+"':0,";
			qt_total+="'"+tbid[i]+"':0,";
		}

		else{
			x+="'"+tbid[i]+"':"+tbprix[i];
			zero+="'"+tbid[i]+"':0";
			qt_total+="'"+tbid[i]+"':0";
		}
	}

	zero="var qttb = {"+ zero+"};";
	x= "var boisson = {"+x+"};";
	qt_total= "var qt_total = {"+qt_total+"};";

	var htm="<!DOCTYPE html>\n <html>\n <head>\n <title>carnet</title>\n\n <meta name='viewport' content='width=device-width, initial-scale=1.0' />\n\n  <meta http-equiv='content-type' content='text/html; charset=utf-8'>\n\n <link rel='stylesheet' href='res/scrp.css' type='text/css' \/>\n\n <script type='text/javascript' src='res/scrp_simple.js'><\/script>\n\n <script type='text/javascript'>\n\n ";
	htm+=x;
	htm+="\n\n";
	htm+=zero;
	htm+="\n\n";
	htm+=qt_total;
	htm+="\n\n <\/script>\n\n </head>\n\n <body>\n\n";

	for(var j = 0 ; j < tbcat.length; j++){

		htm+="<div class='face'><span class='ktitre'>"+tbcat[j]+"</span><br>\n\n";

		for(var i = 0 ; i < tbid.length; i++){


			if(tbcategorie[i]==tbcat[j]){

				htm+="<img src='images/"+tbimage[i]+"' onclick='add(\""+tbid[i]+"\")'/>\n";
			}
		}
		htm+="</div>\n\n";	

	}

	htm+="<div class='face_f'> \n\n";
	htm+="</div>\n\n";
	htm+="</body>\n";
	htm+="</html>";

	if(arguments.length<=0){

		if(navigator.msSaveOrOpenBlob){

			var blobObject = new Blob([htm]);
			window.navigator.msSaveOrOpenBlob(blobObject,"commande"+".html");
		}

		else{
			var blob = new Blob([htm], {type: "text/html"});
			var  url = window.URL.createObjectURL(blob);

			var elem = document.createElement('a');
			elem.href = url;
			elem.download = "commande"+".html";

			var evt = new MouseEvent("click", { bubbles: true,cancelable: true,view: window,});
			elem.dispatchEvent(evt);

			setTimeout(function(){
				window.URL.revokeObjectURL(url);  
			}, 100);
		}
	}

	else{

		open_w(htm);
	}
}



function ajout_liste(){

	var tbinit=dvr.split(",");

	var dec=tbinit.length/4;

	for(var i=0;i<tbinit.length/4;i++){

		tbid.push(tbinit[i]);
		tbprix.push(tbinit[i+dec]);
		tbcategorie.push(tbinit[i+dec*2]);
		tbimage.push(tbinit[i+dec*3]);

		var valeur=tbinit[i];
		var valeur2=tbinit[i+dec];
		var valeur3=tbinit[i+dec*2];
		var valeur4=tbinit[i+dec*3];

		tabinsert(valeur,valeur2,valeur3,valeur4);
	}
}



function init(expediteur){

	var ts=document.getElementById('tabsee');
	ts.innerHTML = '';

	tbid.splice(0, tbid.length);
	tbprix.splice(0, tbprix.length);
	tbcategorie.splice(0, tbcategorie.length);
	tbimage.splice(0, tbimage.length);

	//document.getElementById('categ').innerHTML = '';
	
	tbcat.splice(0, tbcat.length);

	document.getElementById('chx_catego').innerHTML = '';


	if(expediteur=='navigateur'){

		if(localStorage.enregistrement){
			tbinit=localStorage.enregistrement.split(",");
		}
		else{
			alert('pas de fichier navigateur');
			return false;
		}
	}
	
	else if(expediteur=='demo'){

			tbinit=demo.split(",");
	}
	
	else if(expediteur=='fichier'){
		tbinit=dvr.split(",");
	}

	else{
		tbinit=expediteur.split(",");
	}

	var dec=tbinit.length/4;

	for(var i=0;i<tbinit.length/4;i++){

		tbid.push(tbinit[i]);
		tbprix.push(tbinit[i+dec]);
		tbcategorie.push(tbinit[i+dec*2]);
		tbimage.push(tbinit[i+dec*3]);

		var valeur=tbinit[i];
		var valeur2=tbinit[i+dec];
		var valeur3=tbinit[i+dec*2];
		var valeur4=tbinit[i+dec*3];

		tabinsert(valeur,valeur2,valeur3,valeur4);
	}

	tbcat.push(tbcategorie[0]);

	var compteur=0;

	for(var h=0;h<tbcategorie.length;h++){

		for(var i=0;i<tbcat.length;i++){

			if(tbcat[i]==tbcategorie[h]){
				compteur++;
				break;
			}
		}

		if(compteur==0){
			tbcat.push(tbcategorie[h]);
		}
		compteur=0;
	}

	
maj_mod_cat();
}

function maj_mod_cat(){
	
	var dv=document.createElement('div');
		dv.textContent="modifier ordre"
		dv.setAttribute("style"," background-color: #ff853d;color: #070404;font-size: 1.5em;padding: 12px;text-align:center;")
		document.getElementById('categ').appendChild(dv);
	
	document.getElementById('categ').innerHTML = '';
	
	for(var h=0;h<tbcat.length;h++){
		
		var cc=document.createElement('div');
		cc.setAttribute('class','categ');
		cc.setAttribute('draggable','true');
		var texte=document.createTextNode(tbcat[h]);
		cc.appendChild(texte);
		cc.addEventListener('dragstart', drag, false);
		cc.addEventListener('drop', droper, false);
		cc.ondragover=function(){return false}
		
		
		document.getElementById('categ').appendChild(cc);
		
		var dd=document.createElement('li');
		var dv=document.createElement('div');
		var texte=document.createTextNode(tbcat[h]);
		dv.appendChild(texte);
		dv.setAttribute("onclick","element_categorie('"+tbcat[h]+"')");
		dd.appendChild(dv);
		document.getElementById('chx_catego').appendChild(dd);
		dd.parentNode.style.overflow='auto';
	}
}


function enregistrer(qui){

	var save=tbid.toString()+','+tbprix.toString()+','+tbcategorie.toString()+','+tbimage.toString();
	
	
	if(qui=="navigateur"){
		localStorage.enregistrement=save;
	}
	
	else{
		
		if(navigator.msSaveOrOpenBlob){

			var blobObject = new Blob([save]);
			window.navigator.msSaveOrOpenBlob(blobObject,"articles"+".txt");
		}

		else{
			var blob = new Blob([save], {type: "text/plain"});
			var  url = window.URL.createObjectURL(blob);

			var elem = document.createElement('a');
			elem.href = url;
			elem.download = "articles"+".txt";

			var evt = new MouseEvent("click", { bubbles: true,cancelable: true,view: window,});
			elem.dispatchEvent(evt);

			setTimeout(function(){
				window.URL.revokeObjectURL(url);  
			}, 100);
		}
	}
}

function orde(){

	var save=tbid.toString()+','+tbprix.toString()+','+tbcategorie.toString()+','+tbimage.toString();
	init(save);

}


function charger(arg){
	
	var fichier = document.getElementById('fileinput').files;
	
	var charge=new FileReader();

	charge.readAsText(fichier[0]);

	charge.onloadend = function(e){
		dvr= e.target.result;

		init('fichier');

	}

}

function charger2(arg){

	var fichier = document.getElementById('fileinput2').files;

	var charge=new FileReader();
	charge.readAsText(fichier[0]);

	charge.onloadend = function(e){
		dvr= e.target.result;
		ajout_liste();
	}
}

function playdis(){

	var el=document.getElementById('aide')
	if(el.style.display=='none' || el.style.display==''){
		el.style.display='block';
	}
	else{
		el.style.display='none';
	}
}


var kodal={

posi:'haut',			// position de la fenetre par rapport a l'element 'haut' ou 'bas'.
largeur:'conteneur',	// largeur de la fenetre soit on met une valeur sans les guillemets soit on defint a 'conteneur' et la fenetre aurra la taille de l'element.
	decalage_x:150,			// si on souhaite que la fenetre soit decalé par rapport a l'element a zero la fenetre est centré par rapport a l'element.
	decalage_y:0,			// decalage de la bulle en hauteur par rapport a l'element.
	marge_inter:10,			// marge interieur.
	coul_fen:'#AA4C3A',		// couleur de la fenetre.
bordure:2,				// taille de la bordure de la fenetre.
	coul_bord:'#c2e1f5',	// couleur de la bordure de la fenetre.
	posi_fleche:'gauche',	// position de la fleche 'droite' 'centre' ou 'gauche'.
	taille_fleche:20,		// taille de la fleche.
	coul_fleche:'#AA4C3A',	// couleur de la fleche.
	t_police:'11pt',		// taille de la police
	c_police:'Cursive, Helvetica, Verdana, Geneva, sans-serif',		// police

erreur:function(el,texte){

		el.value='';

		var idr=document.getElementById(el.id+'_r');

		if (!idr){

			var element=el;
			var coords_left=0;
			var coords_top=0;

			while (element){
			
				coords_left+= element.offsetLeft;
				coords_top+= element.offsetTop;

				element = element.offsetParent;
			}
			
			var dvr=document.createElement('div');

			dvr.id=el.id+'_r';

			dvr.style.cssText='position:absolute;text-align:center;font-size:'+this.t_police+';font-family:'+this.c_police+';border-radius:6px;border:'+this.bordure+'px solid '+this.coul_bord+';background:'+this.coul_fen+';padding:'+this.marge_inter+'px;box-shadow: 5px 5px 5px 0px #656565;filter:progid:DXImageTransform.Microsoft.Shadow(color=#656565, Direction=134, Strength=5);';

			if(this.largeur=='conteneur'){
				dvr.style.width=el.offsetWidth-this.marge_inter*2-this.bordure*2+'px';
				dvr.style.left=coords_left+this.decalage_x+'px';
			}
			else{
				dvr.style.width=this.largeur+'px';
				dvr.style.left=coords_left+(el.offsetWidth/2-this.largeur/2)+this.decalage_x+'px';
			}
			
			var fleche=document.createElement('div');
			fleche.style.width=0+'px';
			fleche.style.height=0+'px';
			fleche.style.borderLeftWidth=this.taille_fleche/2+'px ';
			fleche.style.borderLeftStyle='solid';
			fleche.style.borderLeftColor='transparent';
			fleche.style.borderRightWidth=this.taille_fleche/2+'px';
			fleche.style.borderRightStyle='solid';
			fleche.style.borderRightColor='transparent';
			fleche.style.position='relative';

			dvr.appendChild(fleche);
			var txt=document.createTextNode(texte);
			dvr.appendChild(txt);
			document.body.appendChild(dvr);

			if(this.posi=='haut'){

				fleche.style.borderTopWidth=this.taille_fleche/2+'px';
				fleche.style.borderTopStyle='solid';
				fleche.style.borderTopColor=this.coul_fleche;
				fleche.style.bottom=-(dvr.offsetHeight)+this.marge_inter+this.bordure-1+'px';
				dvr.style.top=coords_top-(dvr.offsetHeight)-this.taille_fleche-this.decalage_y+'px';
			}

			else if(this.posi=='bas'){

				fleche.style.borderBottomWidth=this.taille_fleche/2+'px';
				fleche.style.borderBottomStyle='solid';
				fleche.style.borderBottomColor=this.coul_fleche;
				fleche.style.bottom=this.taille_fleche/2+this.marge_inter+this.bordure+1+'px';	
				dvr.style.top=coords_top+el.offsetHeight+this.taille_fleche+this.decalage_y+'px';
			}

			if(this.posi_fleche=='gauche'){

				fleche.style.marginLeft=0+'px';
			}

			else if(this.posi_fleche=='droite'){

				fleche.style.marginLeft=dvr.offsetWidth-this.bordure*2-this.taille_fleche-this.marge_inter*2+'px';
			}

			else if(this.posi_fleche=='centre'){
				
				fleche.style.marginLeft=dvr.offsetWidth/2-(this.taille_fleche/2)-this.marge_inter-this.bordure+'px';
			}

			el.onfocus=function(){

				var idr=document.getElementById(el.id+'_r');
				if (idr){
					idr.parentNode.removeChild(idr);
					el.onfocus='';
				}
			}
		}
	}
}



var kdrag={

elemdrag:null,
decx:null,
decy:null,
rar:true,

sp:function(s){

		if(kdrag.rar && arguments.length!=0){
			kdrag.elemdrag=s.currentTarget.parentNode

			var dbe=(navigator.vendor) ? document.body : document.documentElement;

			kdrag.decx=s.clientX + dbe.scrollLeft - kdrag.elemdrag.offsetLeft;
			kdrag.decy=s.clientY + dbe.scrollTop - kdrag.elemdrag.offsetTop;

			s.preventDefault();
			document.documentElement.addEventListener("mousemove", kdrag.posi, false);

			kdrag.rar=false;
		}

		if(kdrag.rar==false && arguments.length==0){
			document.documentElement.removeEventListener("mousemove", kdrag.posi, false);
			kdrag.rar=true;
		}
	},

posi:function(s){

		var dde=(navigator.vendor) ? document.body : document.documentElement;

		var setX =s.clientX + dde.scrollLeft;
		var setY =s.clientY + dde.scrollTop;
		kdrag.elemdrag.style.left=(setX-kdrag.decx)+"px";
		kdrag.elemdrag.style.top=(setY-kdrag.decy)+"px";
	}
}

function open_w(htm){
	var width = 320;
	var height = 480;
	
	if(window.innerWidth){
		var left = (window.innerWidth-width)/2;
		var top = (window.innerHeight-height)/2;
	}
	else{
		var left = (document.body.clientWidth-width)/2;
		var top = (document.body.clientHeight-height)/2;
	}
	var fenetre=window.open('page_teste.html','popup_teste','menubar=no, scrollbars=yes, top='+top+', left='+left+', width='+width+', height='+height+'');

	fenetre.document.write(htm);

	setTimeout(function(){fenetre.addition_init();fenetre.kdeme.init()},300);
}