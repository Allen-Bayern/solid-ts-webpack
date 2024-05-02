const { resolve } = require('path');

/**
 * @description 封装路径, 直接从项目根目录开始, 不用写复杂的...了
 * @param {string} pathFromBase 从项目根目录开始的路径
 * @returns 路径
 */
function withBasePath(pathFromBase = '') {
    return resolve(__dirname, `../../${pathFromBase}`);
}

module.exports = {
    withBasePath,
};
