const basicInfo = require('./basicInfo');
const components = require('./components');
const users = require('./users');
const routes = require('./routes')

module.exports = {
    ...basicInfo,
    ...components,
    ...users,
    ...routes
}