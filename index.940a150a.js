function n(n){const e=function(n){return null!==n&&""!==n&&n.replace(/<[^>]+>/g,"")}(n).split(" ");return e.filter((n=>""!==n.trim())).length}const e={blockClassName:"read-smore",wordsCount:30,charsCount:null,moreText:"Read More",lessText:"Read Less",isInline:!1,linkElement:"a"};(function(t,r){r=Object.assign({},e,r);let i={originalContentArr:[],truncatedContentArr:[]};function a(n){return void 0!==n.dataset.readSmoreChars||null!==r.charsCount}function s(e,s){const d=function(n){return void 0!==n.dataset.readSmoreChars?parseInt(n.dataset.readSmoreChars):null!==r.charsCount?parseInt(r.charsCount):void 0!==n.dataset.readSmoreWords?parseInt(n.dataset.readSmoreWords):null!==r.wordsCount?parseInt(r.wordsCount):void 0}(e),c=e.innerHTML,u=function(n,e,t=!1){const r=function(n){return n.replace(/(^\s*)|(\s*$)/gi,"")}(n);return t?r.split("").slice(0,e-1).join("")+"...":r.split(/\s+/).slice(0,e-1).join(" ")+"..."}(c,d,a(e)),m=a(e)?c.length:n(c);if(i.originalContentArr.push(c),i.truncatedContentArr.push(u),d<m){e.innerHTML=i.truncatedContentArr[s],function(n){const e=function(n){return void 0!==n.dataset.readSmoreInline||!0===r.isInline}(t[n]),i=document.createElement("span");i.className=`${r.blockClassName}__link-wrap`,i.innerHTML=function(){return`\n      <${r.linkElement}\n        class="${r.blockClassName}__link"\n        style="cursor:pointer"\n        aria-expanded="false"\n        tabIndex="0">\n          ${r.moreText}\n      </${r.linkElement}>\n    `}(),e&&o(t[n],i);t[n].after(i),function(n,e){const i=t[n].nextSibling.firstElementChild;i.addEventListener("click",(t=>l(t,n,e))),i.addEventListener("keyup",(t=>{13===t.keyCode&&"a"===r.linkElement&&l(t,n,e)}))}(n,e)}(s)}}function l(n,e,a){t[e].classList.toggle("is-expanded");const s=n.currentTarget;"true"!==s.dataset.clicked?(t[e].innerHTML=i.originalContentArr[e],s.innerHTML=r.lessText,s.dataset.clicked=!0,s.ariaExpanded=!0,a&&o(t[e])):(t[e].innerHTML=i.truncatedContentArr[e],s.innerHTML=r.moreText,s.dataset.clicked=!1,s.ariaExpanded=!1,a&&o(t[e]))}function o(n,e){n&&(n.lastElementChild.style.display="inline",n.style.display="inline"),e&&(e.style.display="inline")}return{init:function(){for(let n=0,e=t.length;n<e;++n)s(t[n],n)}}})(document.querySelectorAll(".js-read-smore")).init();
//# sourceMappingURL=index.940a150a.js.map