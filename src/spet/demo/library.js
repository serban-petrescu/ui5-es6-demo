import sapUi from "sap/ui/Global";
import jQuery from "jquery.sap.global";

/**
 * Demo UI5 library which uses ES6 syntax.
 * @namespace
 * @name spet.demo
 * @version 0.0.1
 * @public
 */
let oLibrary = sapUi.getCore().initLibrary({
	name : "spet.demo",
	version: "0.0.1",
	dependencies : ["sap.ui.core"],
	types: [],
	interfaces: [],
	controls: [],
	elements: [],
	noLibraryCSS: true
}) || jQuery.sap.getObject("spet.demo");

// function definitions "borrowed" from https://medium.com/@adambene/currying-in-javascript-es6-540d2ad09400

/**
 * Transforms a given (bi)function in curry-enabled function.
 * @method spet.demo.curry
 * @param {function} f The function to be curried.
 * @returns {function} The curried function.
 */
oLibrary.curry = f => a => b => f(a, b)

/**
 * Transforms a given curried (bi)function in a regular function.
 * @method spet.demo.uncurry
 * @param {function} f The function to be uncurried.
 * @returns {function} The resulting regular function.
 */
oLibrary.uncurry = f => (a, b) => f(a)(b)

/**
 * Does a partial application on a function (by supplying its first parameter).
 * @method spet.demo.papply
 * @param {function} f The function to be applied.
 * @param {any} 	 a The value for the first parameter of the function.
 * @returns {function} The resulting function (which has one less parameter).
 */
oLibrary.papply = (f, a) => b => f(a, b)

export default oLibrary;