/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 83:
/***/ (function(__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(462);
/* harmony import */ var _modules_menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(556);
/* harmony import */ var _modules_blog_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(847);
/* harmony import */ var _modules_article_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(604);
/* harmony import */ var _modules_html5shiv_printshiv_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(38);
/* harmony import */ var _modules_html5shiv_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(567);







/***/ }),

/***/ 604:
/***/ (function() {

const postPage = document.querySelector('.article__wrapper-text');

// export const loadArticles = async (url = 'https://gorest.co.in/public-api/posts') => {
//   const result = await fetch(url);
//   const data = await result.json();
//   return data;
// };

const pageParams = new URLSearchParams(window.location.search);
const postId = pageParams.get('id');
const createPostPage = async () => {
  let postContent = '';

  /* Запрос конкретного поста по id */
  const response = await fetch(`https://gorest.co.in/public-api/posts/${postId}`);
  const result = await response.json();
  // console.log('result ', result);
  const post = result.data;

  /* Запрос автора конкретного поста по userid */
  const responseIdUser = await fetch(`https://gorest.co.in/public-api/users/${result.data.user_id}`);
  const userId = await responseIdUser.json();
  // console.log('userId :', userId);
  // console.log('userId.Data :', userId.data.message === 'Resource not found');

  /* Рендер конкретного поста */
  postContent = `
        <h2 class="article__title">${post.title}</h2>
        <p class="article__text article__text_mb150">${post.body}</p>
        <div class="article__naw-wrap">
          <a class="article__back-link" href="/blog.html">К списку статей</a>
          <p class="article__autor">
            ${userId.user_id ? userId.user_id : 'Автор не загрузился'} 
          </p>
    `;
  if (postPage) postPage.innerHTML = postContent;
};

/* вызываем функцию создания поста только если определили URL Params */
if (pageParams.size !== 0) createPostPage();

/***/ }),

/***/ 847:
/***/ (function() {

const postsList = document.querySelector('.list');
const navList = document.querySelector('.nav__list');
const getPostData = async () => {
  const pageParams = new URLSearchParams(location.search);
  const postPage = pageParams.get('page');
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${postPage === null ? 1 : postPage}`);
  const result = await response.json();
  return {
    data: result.data,
    pagination: result.meta.pagination,
    ueserId: result.data.user_id
  };
};
const createPostList = async () => {
  const posts = await getPostData();
  let postItem = '';
  for (let i = 0; i < posts.data.length; i++) {
    postItem += `
      <li class="list__item item">
        <div class="item__image-wrapper">
          <img class="item__image" src="https://loremflickr.com/400/400?${i + 1}" alt="Картинка к посту">
        </div>
        <div class="item__desc-wrapper">
          <h2 class="item__title">
            <a ="item__link" href="article.html?id=${posts.data[i].id}">
              ${posts.data[i].title}
            </a>
          </h2>
          <p class="item__date"></p>
          <div class="item__icons-wrapper">
            <span class="item__icons-review"></span>
            <span class="item__icons-comment"></span>
          </div>
        </div>
      </li>
    `;
    postsList.innerHTML = postItem;
  }
};
const createPostNav = async () => {
  const pagination = await getPostData();
  let postNav = '';

  // let counter = 0;
  for (let i = 1; i < pagination.pagination.pages; i++) {
    // if (counter < 3) {
    postNav += `
    <li class="nav__item">
      <a href="blog.html?page=${i}" class="nav__link">
        ${i}
      </a>
    </li>
    `;
    // } else {
    //   postNav += `
    //   <li class="nav__item visually-hidden">
    //     <a href="blog.html?page=${i}" class="nav__link">
    //       ${i}
    //     </a>
    //   </li>
    //   `;
    // }

    // counter += 1;
    navList.innerHTML = postNav;
    navList.style.overflow = 'auto';
  }
};
getPostData();
if (postsList) createPostList();
if (navList) createPostNav();

/***/ }),

/***/ 38:
/***/ (function() {

/**
* @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
;
(function (window, document) {
  /*jshint evil:true */
  /** version */
  var version = '3.7.3';

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

  /** Not all elements can be cloned in IE **/
  var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Name of the expando, to work with multiple documents or to re-shiv one document */
  var expando = '_html5shiv';

  /** The id for the the documents expando */
  var expanID = 0;

  /** Cached data for each document */
  var expandoData = {};

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;
  (function () {
    try {
      var a = document.createElement('a');
      a.innerHTML = '<xyz></xyz>';
      //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
      supportsHtml5Styles = 'hidden' in a;
      supportsUnknownElements = a.childNodes.length == 1 || function () {
        // assign a false positive if unable to shiv
        document.createElement('a');
        var frag = document.createDocumentFragment();
        return typeof frag.cloneNode == 'undefined' || typeof frag.createDocumentFragment == 'undefined' || typeof frag.createElement == 'undefined';
      }();
    } catch (e) {
      // assign a false positive if detection fails => unable to shiv
      supportsHtml5Styles = true;
      supportsUnknownElements = true;
    }
  })();

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
      parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;
    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

  /**
   * Extends the built-in list of html5 elements
   * @memberOf html5
   * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
   * @param {Document} ownerDocument The context document.
   */
  function addElements(newElements, ownerDocument) {
    var elements = html5.elements;
    if (typeof elements != 'string') {
      elements = elements.join(' ');
    }
    if (typeof newElements != 'string') {
      newElements = newElements.join(' ');
    }
    html5.elements = elements + ' ' + newElements;
    shivDocument(ownerDocument);
  }

  /**
  * Returns the data associated to the given document
  * @private
  * @param {Document} ownerDocument The document.
  * @returns {Object} An object of data.
  */
  function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]];
    if (!data) {
      data = {};
      expanID++;
      ownerDocument[expando] = expanID;
      expandoData[expanID] = data;
    }
    return data;
  }

  /**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
  function createElement(nodeName, ownerDocument, data) {
    if (!ownerDocument) {
      ownerDocument = document;
    }
    if (supportsUnknownElements) {
      return ownerDocument.createElement(nodeName);
    }
    if (!data) {
      data = getExpandoData(ownerDocument);
    }
    var node;
    if (data.cache[nodeName]) {
      node = data.cache[nodeName].cloneNode();
    } else if (saveClones.test(nodeName)) {
      node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
    } else {
      node = data.createElem(nodeName);
    }

    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
  }

  /**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
  function createDocumentFragment(ownerDocument, data) {
    if (!ownerDocument) {
      ownerDocument = document;
    }
    if (supportsUnknownElements) {
      return ownerDocument.createDocumentFragment();
    }
    data = data || getExpandoData(ownerDocument);
    var clone = data.frag.cloneNode(),
      i = 0,
      elems = getElements(),
      l = elems.length;
    for (; i < l; i++) {
      clone.createElement(elems[i]);
    }
    return clone;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
  function shivMethods(ownerDocument, data) {
    if (!data.cache) {
      data.cache = {};
      data.createElem = ownerDocument.createElement;
      data.createFrag = ownerDocument.createDocumentFragment;
      data.frag = data.createFrag();
    }
    ownerDocument.createElement = function (nodeName) {
      //abort shiv
      if (!html5.shivMethods) {
        return data.createElem(nodeName);
      }
      return createElement(nodeName, ownerDocument, data);
    };
    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' + 'var n=f.cloneNode(),c=n.createElement;' + 'h.shivMethods&&(' +
    // unroll the `createElement` calls
    getElements().join().replace(/[\w\-:]+/g, function (nodeName) {
      data.createElem(nodeName);
      data.frag.createElement(nodeName);
      return 'c("' + nodeName + '")';
    }) + ');return n}')(html5, data.frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    if (!ownerDocument) {
      ownerDocument = document;
    }
    var data = getExpandoData(ownerDocument);
    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
      // corrects block display not defined in IE6/7/8/9
      'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
      // adds styling not present in IE6/7/8/9
      'mark{background:#FF0;color:#000}' +
      // hides non-rendered elements
      'template{display:none}');
    }
    if (!supportsUnknownElements) {
      shivMethods(ownerDocument, data);
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {
    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',
    /**
     * current version of html5shiv
     */
    'version': version,
    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': options.shivCSS !== false,
    /**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
    'supportsUnknownElements': supportsUnknownElements,
    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': options.shivMethods !== false,
    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',
    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument,
    //creates a shived element
    createElement: createElement,
    //creates a shived documentFragment
    createDocumentFragment: createDocumentFragment,
    //extends list of elements
    addElements: addElements
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

  /*------------------------------- Print Shiv -------------------------------*/

  /** Used to filter media types */
  var reMedia = /^$|\b(?:all|print)\b/;

  /** Used to namespace printable elements */
  var shivNamespace = 'html5shiv';

  /** Detect whether the browser supports shivable style sheets */
  var supportsShivableSheets = !supportsUnknownElements && function () {
    // assign a false negative if unable to shiv
    var docEl = document.documentElement;
    return !(typeof document.namespaces == 'undefined' || typeof document.parentWindow == 'undefined' || typeof docEl.applyElement == 'undefined' || typeof docEl.removeNode == 'undefined' || typeof window.attachEvent == 'undefined');
  }();

  /*--------------------------------------------------------------------------*/

  /**
   * Wraps all HTML5 elements in the given document with printable elements.
   * (eg. the "header" element is wrapped with the "html5shiv:header" element)
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Array} An array wrappers added.
   */
  function addWrappers(ownerDocument) {
    var node,
      nodes = ownerDocument.getElementsByTagName('*'),
      index = nodes.length,
      reElements = RegExp('^(?:' + getElements().join('|') + ')$', 'i'),
      result = [];
    while (index--) {
      node = nodes[index];
      if (reElements.test(node.nodeName)) {
        result.push(node.applyElement(createWrapper(node)));
      }
    }
    return result;
  }

  /**
   * Creates a printable wrapper for the given element.
   * @private
   * @param {Element} element The element.
   * @returns {Element} The wrapper.
   */
  function createWrapper(element) {
    var node,
      nodes = element.attributes,
      index = nodes.length,
      wrapper = element.ownerDocument.createElement(shivNamespace + ':' + element.nodeName);

    // copy element attributes to the wrapper
    while (index--) {
      node = nodes[index];
      node.specified && wrapper.setAttribute(node.nodeName, node.nodeValue);
    }
    // copy element styles to the wrapper
    wrapper.style.cssText = element.style.cssText;
    return wrapper;
  }

  /**
   * Shivs the given CSS text.
   * (eg. header{} becomes html5shiv\:header{})
   * @private
   * @param {String} cssText The CSS text to shiv.
   * @returns {String} The shived CSS text.
   */
  function shivCssText(cssText) {
    var pair,
      parts = cssText.split('{'),
      index = parts.length,
      reElements = RegExp('(^|[\\s,>+~])(' + getElements().join('|') + ')(?=[[\\s,>+~#.:]|$)', 'gi'),
      replacement = '$1' + shivNamespace + '\\:$2';
    while (index--) {
      pair = parts[index] = parts[index].split('}');
      pair[pair.length - 1] = pair[pair.length - 1].replace(reElements, replacement);
      parts[index] = pair.join('}');
    }
    return parts.join('{');
  }

  /**
   * Removes the given wrappers, leaving the original elements.
   * @private
   * @params {Array} wrappers An array of printable wrappers.
   */
  function removeWrappers(wrappers) {
    var index = wrappers.length;
    while (index--) {
      wrappers[index].removeNode();
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document for print.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivPrint(ownerDocument) {
    var shivedSheet,
      wrappers,
      data = getExpandoData(ownerDocument),
      namespaces = ownerDocument.namespaces,
      ownerWindow = ownerDocument.parentWindow;
    if (!supportsShivableSheets || ownerDocument.printShived) {
      return ownerDocument;
    }
    if (typeof namespaces[shivNamespace] == 'undefined') {
      namespaces.add(shivNamespace);
    }
    function removeSheet() {
      clearTimeout(data._removeSheetTimer);
      if (shivedSheet) {
        shivedSheet.removeNode(true);
      }
      shivedSheet = null;
    }
    ownerWindow.attachEvent('onbeforeprint', function () {
      removeSheet();
      var imports,
        length,
        sheet,
        collection = ownerDocument.styleSheets,
        cssText = [],
        index = collection.length,
        sheets = Array(index);

      // convert styleSheets collection to an array
      while (index--) {
        sheets[index] = collection[index];
      }
      // concat all style sheet CSS text
      while (sheet = sheets.pop()) {
        // IE does not enforce a same origin policy for external style sheets...
        // but has trouble with some dynamically created stylesheets
        if (!sheet.disabled && reMedia.test(sheet.media)) {
          try {
            imports = sheet.imports;
            length = imports.length;
          } catch (er) {
            length = 0;
          }
          for (index = 0; index < length; index++) {
            sheets.push(imports[index]);
          }
          try {
            cssText.push(sheet.cssText);
          } catch (er) {}
        }
      }

      // wrap all HTML5 elements with printable elements and add the shived style sheet
      cssText = shivCssText(cssText.reverse().join(''));
      wrappers = addWrappers(ownerDocument);
      shivedSheet = addStyleSheet(ownerDocument, cssText);
    });
    ownerWindow.attachEvent('onafterprint', function () {
      // remove wrappers, leaving the original elements, and remove the shived style sheet
      removeWrappers(wrappers);
      clearTimeout(data._removeSheetTimer);
      data._removeSheetTimer = setTimeout(removeSheet, 500);
    });
    ownerDocument.printShived = true;
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  // expose API
  html5.type += ' print';
  html5.shivPrint = shivPrint;

  // shiv for print
  shivPrint(document);
  if (typeof module == 'object' && module.exports) {
    module.exports = html5;
  }
})(typeof window !== "undefined" ? window : undefined, document);

/***/ }),

/***/ 567:
/***/ (function() {

/**
* @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
;
(function (window, document) {
  /*jshint evil:true */
  /** version */
  var version = '3.7.3';

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

  /** Not all elements can be cloned in IE **/
  var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Name of the expando, to work with multiple documents or to re-shiv one document */
  var expando = '_html5shiv';

  /** The id for the the documents expando */
  var expanID = 0;

  /** Cached data for each document */
  var expandoData = {};

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;
  (function () {
    try {
      var a = document.createElement('a');
      a.innerHTML = '<xyz></xyz>';
      //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
      supportsHtml5Styles = 'hidden' in a;
      supportsUnknownElements = a.childNodes.length == 1 || function () {
        // assign a false positive if unable to shiv
        document.createElement('a');
        var frag = document.createDocumentFragment();
        return typeof frag.cloneNode == 'undefined' || typeof frag.createDocumentFragment == 'undefined' || typeof frag.createElement == 'undefined';
      }();
    } catch (e) {
      // assign a false positive if detection fails => unable to shiv
      supportsHtml5Styles = true;
      supportsUnknownElements = true;
    }
  })();

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
      parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;
    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

  /**
   * Extends the built-in list of html5 elements
   * @memberOf html5
   * @param {String|Array} newElements whitespace separated list or array of new element names to shiv
   * @param {Document} ownerDocument The context document.
   */
  function addElements(newElements, ownerDocument) {
    var elements = html5.elements;
    if (typeof elements != 'string') {
      elements = elements.join(' ');
    }
    if (typeof newElements != 'string') {
      newElements = newElements.join(' ');
    }
    html5.elements = elements + ' ' + newElements;
    shivDocument(ownerDocument);
  }

  /**
  * Returns the data associated to the given document
  * @private
  * @param {Document} ownerDocument The document.
  * @returns {Object} An object of data.
  */
  function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]];
    if (!data) {
      data = {};
      expanID++;
      ownerDocument[expando] = expanID;
      expandoData[expanID] = data;
    }
    return data;
  }

  /**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document|DocumentFragment} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
  function createElement(nodeName, ownerDocument, data) {
    if (!ownerDocument) {
      ownerDocument = document;
    }
    if (supportsUnknownElements) {
      return ownerDocument.createElement(nodeName);
    }
    if (!data) {
      data = getExpandoData(ownerDocument);
    }
    var node;
    if (data.cache[nodeName]) {
      node = data.cache[nodeName].cloneNode();
    } else if (saveClones.test(nodeName)) {
      node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
    } else {
      node = data.createElem(nodeName);
    }

    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
  }

  /**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
  function createDocumentFragment(ownerDocument, data) {
    if (!ownerDocument) {
      ownerDocument = document;
    }
    if (supportsUnknownElements) {
      return ownerDocument.createDocumentFragment();
    }
    data = data || getExpandoData(ownerDocument);
    var clone = data.frag.cloneNode(),
      i = 0,
      elems = getElements(),
      l = elems.length;
    for (; i < l; i++) {
      clone.createElement(elems[i]);
    }
    return clone;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
  function shivMethods(ownerDocument, data) {
    if (!data.cache) {
      data.cache = {};
      data.createElem = ownerDocument.createElement;
      data.createFrag = ownerDocument.createDocumentFragment;
      data.frag = data.createFrag();
    }
    ownerDocument.createElement = function (nodeName) {
      //abort shiv
      if (!html5.shivMethods) {
        return data.createElem(nodeName);
      }
      return createElement(nodeName, ownerDocument, data);
    };
    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' + 'var n=f.cloneNode(),c=n.createElement;' + 'h.shivMethods&&(' +
    // unroll the `createElement` calls
    getElements().join().replace(/[\w\-:]+/g, function (nodeName) {
      data.createElem(nodeName);
      data.frag.createElement(nodeName);
      return 'c("' + nodeName + '")';
    }) + ');return n}')(html5, data.frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    if (!ownerDocument) {
      ownerDocument = document;
    }
    var data = getExpandoData(ownerDocument);
    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
      // corrects block display not defined in IE6/7/8/9
      'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
      // adds styling not present in IE6/7/8/9
      'mark{background:#FF0;color:#000}' +
      // hides non-rendered elements
      'template{display:none}');
    }
    if (!supportsUnknownElements) {
      shivMethods(ownerDocument, data);
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {
    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video',
    /**
     * current version of html5shiv
     */
    'version': version,
    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': options.shivCSS !== false,
    /**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
    'supportsUnknownElements': supportsUnknownElements,
    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': options.shivMethods !== false,
    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',
    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument,
    //creates a shived element
    createElement: createElement,
    //creates a shived documentFragment
    createDocumentFragment: createDocumentFragment,
    //extends list of elements
    addElements: addElements
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);
  if (typeof module == 'object' && module.exports) {
    module.exports = html5;
  }
})(typeof window !== "undefined" ? window : undefined, document);

/***/ }),

/***/ 556:
/***/ (function() {

const button = document.querySelector('.header__menu');
const modal = document.querySelector('.modal');
button.addEventListener('click', () => {
  modal.classList.toggle('modal_none');
  if (modal.classList.contains('modal_none')) {
    button.setAttribute('aria-expanded', false);
  } else {
    button.setAttribute('aria-expanded', true);
  }
});

/***/ }),

/***/ 462:
/***/ (function() {

const timerBlock = document.querySelector('.timer');
const setTimer = deadline => {
  // получить элементы со страницы

  const timerBlockDay = document.querySelector('.timer-day');
  const timerBlockHour = document.querySelector('.timer-hour');
  const timerBlockMin = document.querySelector('.timer-min');
  const timerTextDay = document.querySelector('.timer-day-txt');
  const timerTextHour = document.querySelector('.timer-hour-txt');
  const timerTextMin = document.querySelector('.timer-min-txt');
  const timerText = document.querySelector('.hero__promo-time-end');

  // меняет время окончания акции по времени
  const changeTimezone = (timezone, timeRemaining = 0) => {
    const date = new Date();
    const currentTimezone = date.getTimezoneOffset();
    const changeTimezone = timeRemaining + currentTimezone * 60 * 1000 + timezone * 60 * 60 * 1000;
    return changeTimezone;
  };

  // получить оставшееся время до дедлайна
  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();
    let timeRemaining = dateStop - dateNow;

    // меняет время окончания акции по времени +3 от гринвича
    timeRemaining = changeTimezone(+3, timeRemaining);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);
    let hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
    let minutes = Math.floor(timeRemaining / 1000 / 60 % 60);

    // склоняет дни, часы минуты
    const declensionNum = function (num, words) {
      const result = num === 1 || num > 20 && num % 10 === 1 ? words[0] : num > 1 && num < 5 || num % 10 > 1 && num % 10 < 5 ? words[1] : words[2];
      return result;
    };

    // делает двузначным часы и минуты
    const formatTime = (h, min) => {
      if (min < 10) {
        min = `0${min}`;
      }
      if (h < 10) {
        h = `0${h}`;
      }
    };
    timerTextDay.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
    timerTextHour.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
    timerTextMin.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);

    // меняем на двузначное число часы и минуты
    formatTime(hours, minutes);
    return {
      timeRemaining,
      days,
      minutes,
      hours
    };
  };

  // меняет формат таймера (цвет)
  // const setStyleTimer = (days, hours) => {
  //   if (days === 0 && hours < 24) {
  //     timerBlock.style.backgroundColor = 'red';
  //     timerText.style.backgroundColor = 'red';
  //   } else {
  //     timerBlock.style.backgroundColor = 'green';
  //     timerText.style.backgroundColor = 'green';
  //   }
  // };

  /* Замена кода изменения цвета (оставил только красный) */
  const setStyleTimer = (days, hours) => {
    if (days === 0 && hours < 24) {
      timerBlock.style.backgroundColor = 'red';
      timerText.style.backgroundColor = 'red';
    }
  };
  const start = () => {
    const timer = getTimeRemaining();

    // вызов изменений стиля таймера
    setStyleTimer(timer.days, timer.hours);

    // вставить таймер в верстку
    timerBlockDay.textContent = timer.days;
    timerBlockHour.textContent = timer.hours;
    timerBlockMin.textContent = timer.minutes;

    // вставить склонение слов таймера в верстку
    timerTextDay.lastChild.textContent = ' ' + timerTextDay.dataset.title;
    timerTextHour.lastChild.textContent = ' ' + timerTextHour.dataset.title;
    timerTextMin.lastChild.textContent = ' ' + timerTextMin.dataset.title;

    // обновляет время
    const intervalId = setTimeout(start, 1000);

    // убирает таймер на 00:00:00
    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      timerBlock.innerHTML = '';
      timerText.innerHTML = '';
    }
  };

  // запуск кода таймера
  start();
};

// запуск плагина таймера
// Находит датасет атрибут и запускает таймер по нему
document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM LOAD');
  const serchElem = document.querySelector('[data-deadline]');
  if (serchElem) setTimer(timerBlock.dataset.deadline);
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(462);
/******/ 	__webpack_require__(556);
/******/ 	__webpack_require__(847);
/******/ 	__webpack_require__(604);
/******/ 	__webpack_require__(83);
/******/ 	__webpack_require__(38);
/******/ 	var __webpack_exports__ = __webpack_require__(567);
/******/ 	
/******/ })()
;