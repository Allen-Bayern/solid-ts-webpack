const { resolve } = require('path');

/**
 * @description write path as from root path
 * @param {string} pathFromBase the path from the root of the project
 * @returns 路径
 */
function withBasePath(pathFromBase = '') {
    return resolve(__dirname, `../../${pathFromBase}`);
}

module.exports = {
    withBasePath,
};
