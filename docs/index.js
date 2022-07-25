const basicInfo = require('./basicInfo');
const components = require('./components');
const users = require('./users');
// const routes = require('./routes');
const comments = require('./comment')

module.exports = {
    ...basicInfo,
    ...components,
    ...users,
    // ...routes,
    ...comments
}