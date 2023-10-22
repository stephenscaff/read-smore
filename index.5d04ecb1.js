const e={blockClassName:"read-smore",wordsCount:30,charsCount:null,moreText:"Read More",lessText:"Read Less",isInline:!1,linkElement:"a"},t=document.querySelectorAll(".js-read-smore"),n=/**
 * ReadSmore
 * A simple Read More / Read Less js plugin that maintains origial markup.
 *
 * @author @stephenscaff
 * @param {HTML element} elements
 * @param {Object} options
 * @returns
 */function(t,n){n={...e,...n};// Internal Settings
let r={originalContentArr:[],truncatedContentArr:[]};/**
   * Toggle event
   * @private
   * @param {Event} event - click | keyup event
   * @param {Number} idx - index of clicked link
   * @param {Bool} isInlineLink - if link element is inline with content
   */function a(e,a,s){let i=t[a].dataset.readSmoreMoreText,o=t[a].dataset.readSmoreLessText,d=e.currentTarget,c="true"===d.dataset.clicked;t[a].classList.toggle("is-expanded"),t[a].innerHTML=c?r.truncatedContentArr[a]:r.originalContentArr[a],d.innerHTML=c?i||n.moreText:o||n.lessText,d.dataset.clicked=!c,d.ariaExpanded=!c,s&&l(t[a])}/**
   * Add styles for inline option
   * @private
   * @param {HTML Elmenent} el - single element instance
   * @param {HTML Elmenent} link - link wrapper element
   */function l(e,t){e&&(e.lastElementChild.style.display="inline",e.style.display="inline"),t&&(t.style.display="inline")}// API
return{init:/**
   * Init plugin
   * Loop over instances and begin truncation procress
   * @public
   */function(){t.forEach((e,s)=>{!/**
   * Truncate logic
   * Gets user defined count for words/chars (set by data att, option or default),
   * gets content's count by words/chars, if defined is less than content, truncate
   * @private
   * @param {HTML Elmenent} el - single element instance
   * @param {Number} idx - current instance index
   */function(e,s){let i=parseInt(e.dataset.readSmoreChars)||parseInt(n.charsCount)||parseInt(e.dataset.readSmoreWords)||parseInt(n.wordsCount),o=e.innerHTML,d=void 0!==e.dataset.readSmoreChars||null!==n.charsCount,c=/**
   * Ellpise Content
   * Handles content ellipse by words or charactes
   * @private
   * @param {String} str - content string.
   * @param {Number} max - Number of words||chars2 to show before truncation.
   * @param {Bool} isChars - is by chars
   */function(e,t,n=!1){let r=e.replace(/(^\s*)|(\s*$)/gi,"");if(n)return r.slice(0,t-1)+"...";let a=r.split(/\s+/);return a.slice(0,t-1).join(" ")+"..."}(o,i,d),u=d?o.length:function(e){let t=(null!==e&&""!==e&&e.replace(/<[^>]+>/g,"")).split(" ");return t.filter(e=>""!==e.trim()).length}(o);r.originalContentArr.push(o),r.truncatedContentArr.push(c),i<u&&(e.innerHTML=r.truncatedContentArr[s],/**
   * Creates and Inserts Read More Link
   * @private
   * @param {Number} idx - index reference of looped item
   */function(e){let r=void 0!==t[e].dataset.readSmoreInline||!0===n.isInline,s=document.createElement("span");s.className=`${n.blockClassName}__link-wrap`,s.innerHTML=/**
   * Read More Link Template
   * @param {HTML Element} el
   * @returns {String} - html string
   */function(e){let t=e.dataset.readSmoreMoreText,r=t||n.moreText;return`
      <${n.linkElement}
        class="${n.blockClassName}__link"
        style="cursor:pointer"
        aria-expanded="false"
        tabIndex="0">
          ${r}
      </${n.linkElement}>
    `}(t[e]),r&&l(t[e],s),t[e].after(s),/**
   * Sets up and calls click and keyup (enter key) events
   * @private
   * @param {Number} idx - index of clicked link
   * @param {Bool} isInlineLink - if link element is inline with content
   */function(e,r){let l=t[e].nextSibling.firstElementChild;l.addEventListener("click",t=>a(t,e,r)),l.addEventListener("keyup",t=>{13===t.keyCode&&"a"===n.linkElement&&a(t,e,r)})}(e,r)}(s))}(e,s)})}}}(t);n.init();//# sourceMappingURL=index.5d04ecb1.js.map

//# sourceMappingURL=index.5d04ecb1.js.map
