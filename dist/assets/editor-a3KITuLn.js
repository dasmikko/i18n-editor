import{p as h,q as L,r as l,w as _,o as E,L as T,x as k,T as O,H as S,G as B,y as M,z as R,u as A,A as H,B as F,C as D,D as U,E as w,F as y,I as V,J,K as N,M as z,s as G,N as q}from"./index-DEusB8us.js";const K={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},W=l("path",{fill:"currentColor",d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"},null,-1),X=[W];function I(i,s){return h(),L("svg",K,[...X])}const P={name:"ic-baseline-content-copy",render:I},Q={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},Y=l("path",{fill:"currentColor",d:"M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3s-1.34 3-3 3m3-10H5V5h10z"},null,-1),Z=[Y];function $(i,s){return h(),L("svg",Q,[...Z])}const ee={name:"ic-save",render:$};var ne={exports:{}};(function(i,s){(function(f,t){t()})(_,function(){function f(e,n){return typeof n>"u"?n={autoBom:!1}:typeof n!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),n={autoBom:!n}),n.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\uFEFF",e],{type:e.type}):e}function t(e,n,a){var o=new XMLHttpRequest;o.open("GET",e),o.responseType="blob",o.onload=function(){p(o.response,n,a)},o.onerror=function(){console.error("could not download file")},o.send()}function v(e){var n=new XMLHttpRequest;n.open("HEAD",e,!1);try{n.send()}catch{}return 200<=n.status&&299>=n.status}function u(e){try{e.dispatchEvent(new MouseEvent("click"))}catch{var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(n)}}var c=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof _=="object"&&_.global===_?_:void 0,d=c.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),p=c.saveAs||(typeof window!="object"||window!==c?function(){}:"download"in HTMLAnchorElement.prototype&&!d?function(e,n,a){var o=c.URL||c.webkitURL,r=document.createElement("a");n=n||e.name||"download",r.download=n,r.rel="noopener",typeof e=="string"?(r.href=e,r.origin===location.origin?u(r):v(r.href)?t(e,n,a):u(r,r.target="_blank")):(r.href=o.createObjectURL(e),setTimeout(function(){o.revokeObjectURL(r.href)},4e4),setTimeout(function(){u(r)},0))}:"msSaveOrOpenBlob"in navigator?function(e,n,a){if(n=n||e.name||"download",typeof e!="string")navigator.msSaveOrOpenBlob(f(e,a),n);else if(v(e))t(e,n,a);else{var o=document.createElement("a");o.href=e,o.target="_blank",setTimeout(function(){u(o)})}}:function(e,n,a,o){if(o=o||open("","_blank"),o&&(o.document.title=o.document.body.innerText="downloading..."),typeof e=="string")return t(e,n,a);var r=e.type==="application/octet-stream",C=/constructor/i.test(c.HTMLElement)||c.safari,x=/CriOS\/[\d]+/.test(navigator.userAgent);if((x||r&&C||d)&&typeof FileReader<"u"){var b=new FileReader;b.onloadend=function(){var m=b.result;m=x?m:m.replace(/^data:[^;]*;/,"data:attachment/file;"),o?o.location.href=m:location=m,o=null},b.readAsDataURL(e)}else{var j=c.URL||c.webkitURL,g=j.createObjectURL(e);o?o.location=g:location.href=g,o=null,setTimeout(function(){j.revokeObjectURL(g)},4e4)}});c.saveAs=p.saveAs=p,i.exports=p})})(ne);const oe={name:"editor",components:{LoadJsonDialog:T,AddLangDialog:k,Treeview:O,HelloWorld:S,Grid:B,GridColumn:M},setup(){const i=G(),s=R(!1),f=A();H(()=>{if(Object.keys(i.langObj.value).length===0){f.replace("/");return}document.addEventListener("keydown",u),i.findExistingLangs()}),F(()=>{document.removeEventListener("keydown",u)});const t=async()=>{await navigator.clipboard.writeText(JSON.stringify(i.langObj.value)),console.log(await navigator.clipboard.readText())},v=()=>{f.replace("/")},u=d=>{d.keyCode===83&&d.ctrlKey&&(d.preventDefault(),c())},c=async()=>{let d=new Blob([JSON.stringify(i.langObj.value)],{type:"application/json"});if(i.isMergingFiles.value){const e={name:i.filename,types:[{description:"i18n json file",accept:{"application/json":[".json"]}}]};i.fileHandler.value=[await window.showSaveFilePicker(e)],i.isMergingFiles.value=!1}const p=await i.fileHandler.value[0].createWritable();await p.write(d),await p.close()};return D(s,()=>{i.tabDownColumn.value=s.value}),{langs:i.langObj,tabByColumn:s,copyToClipboard:t,onLoadJsonClick:v,onSave:u,saveLanguageFile:c}}},te={key:0,class:"p-4"},ae={class:"options"},ie={for:"tabbycolumn"},se=l("p",{class:"font-bold text-xl"},"JSON",-1),ce={class:"preview"};function re(i,s,f,t,v,u){const c=q,d=k,p=ee,e=U("Treeview"),n=P;return Object.keys(t.langs).length?(h(),L("div",te,[l("div",ae,[l("button",{onClick:s[0]||(s[0]=(...a)=>t.onLoadJsonClick&&t.onLoadJsonClick(...a)),tabindex:"-1"},[w(c),y(" Load i18n JSON ")]),l("label",ie,[V(l("input",{type:"checkbox",id:"tabbycolumn","onUpdate:modelValue":s[1]||(s[1]=a=>t.tabByColumn=a)},null,512),[[J,t.tabByColumn]]),y(" Tab by column ")]),w(d),l("button",{onClick:s[2]||(s[2]=(...a)=>t.saveLanguageFile&&t.saveLanguageFile(...a)),tabindex:"-1"},[w(p),y(" Save (CTRL+S) ")])]),w(e,{obj:t.langs},null,8,["obj"]),se,l("div",ce,[l("div",{class:"copy-to-clipboard",onClick:s[3]||(s[3]=(...a)=>t.copyToClipboard&&t.copyToClipboard(...a))},[w(n)]),l("pre",null,N(t.langs),1)])])):z("",!0)}const de=E(oe,[["render",re]]);export{de as default};
