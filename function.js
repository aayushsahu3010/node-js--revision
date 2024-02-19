function add(a, b) {
    return a + b;
}   

function sub(a, b) {
    return a - b;
}

// module.exports = {add,sub}; // export the function

exports.multiply = (a, b) => a*b;
exports.divide = (a, b) => a/b;