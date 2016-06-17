/* eslint-disable max-len */
const jsObject = {
	typeString: 'I am a string',
	typeInteger: 123,
	typeNegativeInteger: -123,
	typeFloat: 1.2,
	typeNegativeFloat: -1.2,
	typeZero: 0,
	typeNegativeZero: -0,
	typeInfinity: Infinity,
	typeNegativeInfinity: -Infinity,
	typeNaN: NaN,
	typeNull: null,
	typeBoolean: true,
	typeBoolean2: false,
	typeArray: [1, 'a', {}, [], null, NaN],
	typeObject: { a: 1, b: 'b', c: { ca: true } },
	typeFunction: () => { return () => 'hello'; },
	typeRegex: /\//,
	typeUndefined: undefined,
	typeDate: new Date(),
	typeError: new Error('I am an Error')
};

jsObject.typeCircularReference = jsObject;

export default jsObject;
