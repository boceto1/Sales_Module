/*//General Functions
const mapTransducer = (mapper) =>
                        (reducingFunction) =>(result, input) => reducingFunction(result, mapper(input));

const filterTransducer = (predicate) =>
                            (reducingFunction) =>
                                (result, input) => predicate(input) ? reducingFunction(result, input) : result;

const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

const concatReducer = (result, input) => result.concat(input);

// Filters

const lowerThan6 = filterTransducer((value) => value < 6);
const double = mapTransducer((value) => value * 2);

const numbers = [1,2,3,4,5,6,7,8,9,10];


const xform = compose(lowerThan6, double);

const output = numbers.reduce(xform(concatReducer), []);

console.log(output)*/