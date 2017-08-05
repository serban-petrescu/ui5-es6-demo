/* global QUnit */
import library from "spet/demo/library";

QUnit.module("library");

let fnRegAdd = (a, b) => a + 2 * b;
let fnCrrAdd = a => b => a + 2 * b

QUnit.test("Should curry the non-commutative regular addition function.", assert => {
	let add = library.curry(fnRegAdd);
	assert.equal(add(5)(10), 25, "Result is correct.");
});

QUnit.test("Should uncurry the non-commutative curried addition function.", assert => {
	let add = library.uncurry(fnCrrAdd);
	assert.equal(add(5, 10), 25, "Result is correct.");
});

QUnit.test("Should partially apply the non-commutative regular addition function.", assert => {
	let add = library.papply(fnRegAdd, 5);
	assert.equal(add(10), 25, "Result is correct.");
});
