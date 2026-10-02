/* ===== PERSONALIZA AQUÍ ===== */
// Fecha como contraseña, formato DDMMAAAA (puedes usar solo DDMM si prefieres 4 dígitos)
const PIN = "02102007";
// Fotos: copia tus imágenes a la carpeta "fotos" y nómbralas foto1, foto2, foto3...
// Puede ser .jpg, .jpeg, .png o .webp (incluso mezcladas): el programa prueba cada formato solo.
// Cambia aquí cuántas tienes (máx. 25). Con 0 salen marcos con corazones.
const PHOTO_COUNT = 30;
const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP"];
const PHOTOS = Array.from({length: PHOTO_COUNT}, (_, i) => `fotos/foto${i+1}`);
// Una carta por flor (6 flores)
const LETTERS = [
  {t:"Mi amor",x:"Quiero decirte que te amo mucho, que sos una de las mas grandes bendiciones que Dios me ha dado, decirte que nunca estas sola y que admiro tu valor y tu gran corazon.\n\nQuiero deserarte un feliz cumpleaños, ya van 19 añotes, hace 19 años nacio la mujer mas hermosa del mundo, la mujer que me hace feliz. \n\nTe amo mucho mi amor y espero poder pasar muchos años mas a tu lado."},
  {t:"Lo que más me gusta de ti",x:"Tus ojos, tu sonrisa, tu forma de ser, tus labios, tu cabello, su cuerpo completo. No hay parte de vos que no me guste, Dios creo a alguien tan hermosa como vos, no puedo decir que lo hizo pensando en mi por que siento que sos demasiado para mi. \n\n Me encanta tu manera de pensar, tu manera de amar, de perdonar, y de confiar a pesar de mis errores. Amo tu valentia y tu inteligencia."},
  {t:"Nuestro primer recuerdo",x:"Recuerdo cuando te vi mi primer regalo y cuando nos dimos nuestro primer beso, JAJAJAJA Fue en la oficina de mi mamá, siento que desde ese dia mi mamá quedo convencida de que estaba loco por vos JAJAJAJA. y yo, al ver tu cara luego de darye el beso, no me quedo duda de que eras la mujer con la que queria estar para toda mi vida."},
  {t:"Gracias",x:"Por aguantarme, por darme tu amor a pesar de mis errores, por soportar mis inperfecciones, por confiar en mi, por amarme y por ser la mujer mas hermosa del mundo. Gracias por existir y por ser parte de mi vida."},
  {t:"Mis sueños",x:"Sueño con que consigamos esa casita que tanto queremos, con ese patio grande y ese estilo de tipo casita de rancho o de quinta jajaja. Sueño que viajamos por muchos paises, nuestra boda, nuestra luna de miel y todos los lugares que queres visitar juntos, sueño con nuestros hijos. Sueño que llegamos a ser santos y que nuestros hijos tambien, sueño que seamos como María y José."},
  {t:"Te amo",x:"Dios, te agradezco por la mujer que me diste, esa que fue respuesta a mi suplicas, fue tu voz respodiendo a mis oraciones, te pido que nos mantengas unidos, que nos ayudes a vencer cada prueba que se nos presente. Enseñame Jesús, a amarla y valorarla como tu amas la iglesia, y enseñame a ser un mejor novio para ella, san jose ayudame a ser un mejor hombre para ella. Mamita maria no nos dejes solos y acompañanos siempre y que el rosario nos mantenga siempre unidos. Amen"}
];
/* ============================ */

const $=id=>document.getElementById(id);
let typed="";
const dots=$("dots"),pad=$("pad");
for(let i=0;i<PIN.length;i++)dots.appendChild(document.createElement("i"));
[1,2,3,4,5,6,7,8,9,"",0,"⌫"].forEach(k=>{
  const b=document.createElement("button");
  b.textContent=k;
  if(k==="")b.className="ghost",b.disabled=true;
  else b.onclick=()=>press(String(k));
  pad.appendChild(b);
});
function paint(){[...dots.children].forEach((d,i)=>d.classList.toggle("on",i<typed.length))}
function press(k){
  if(k==="⌫")typed=typed.slice(0,-1);
  else if(typed.length<PIN.length)typed+=k;
  paint();
  if(typed.length===PIN.length){
    if(typed===PIN)setTimeout(unlock,250);
    else{dots.classList.add("shake");$("q").textContent="Esa no es… piensa en que fecha es hoy 💭";
      setTimeout(()=>{dots.classList.remove("shake");typed="";paint()},500)}
  }
}
addEventListener("keydown",e=>{
  if($("lock").classList.contains("off"))return;
  if(/^\d$/.test(e.key))press(e.key);else if(e.key==="Backspace")press("⌫");
});

// Busca cuáles fotos existen (foto1..fotoN, cualquier formato) y se salta las que falten
function findPhoto(base){
  return new Promise(res=>{
    let k=0;
    const im=new Image();
    im.onload=()=>res(im.src);
    im.onerror=()=>{k++;if(k<EXTENSIONS.length)im.src=base+"."+EXTENSIONS[k];else res(null)};
    im.src=base+"."+EXTENSIONS[0];
  });
}
const photosReady=Promise.all(PHOTOS.map(findPhoto)).then(l=>l.filter(Boolean));
function loadPhoto(im,url){im.src=url}
function buildRain(list){
  const r=$("rain");r.innerHTML="";
  const n=30;
  for(let i=0;i<n;i++){
    const d=document.createElement("div");d.className="ph";
    const s=70+Math.random()*60;
    d.style.cssText=`left:${Math.random()*92}%;width:${s}px;height:${s*1.15}px;animation-duration:${14+Math.random()*12}s;animation-delay:-${Math.random()*30}s;--r1:${-15+Math.random()*30}deg;--r2:${-15+Math.random()*30}deg`;
    if(list.length){const im=new Image();im.alt="";d.appendChild(im);loadPhoto(im,list[i%list.length])}
    else d.textContent=["💗","🌷","✨","🌸"][i%4];
    r.appendChild(d);
  }
}
function unlock(){
  $("lock").classList.add("off");
  photosReady.then(buildRain);
  $("scene").classList.add("on");
  setTimeout(()=>$("bouquet").classList.add("go"),500);
}
$("addph").onclick=()=>$("file").click();
$("file").onchange=e=>{
  const urls=[...e.target.files].slice(0,30).map(f=>URL.createObjectURL(f));
  if(urls.length)buildRain(urls);
};

document.querySelectorAll(".fl").forEach(f=>f.addEventListener("click",()=>{
  const L=LETTERS[+f.dataset.i];
  $("lt").textContent=L.t;$("lx").textContent=L.x;
  $("modal").classList.add("on");
}));
$("close").onclick=()=>$("modal").classList.remove("on");
$("modal").onclick=e=>{if(e.target.id==="modal")$("modal").classList.remove("on")};
