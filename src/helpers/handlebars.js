const Handlebars = require('handlebars')

module.exports = {
        index(a, b)  {return a - b},
        sortable(field, sort) {

            const sortType = field === sort.column ? sort.type : 'default'
            //const isValidType =  ['asc', 'desc'].includes(sort.type) ? sort.type : 'default'
            const icons = {
             default: 'fa-elevator',
             asc: 'fa-arrow-up-short-wide',
             desc: 'fa-arrow-up-wide-short'
            }
            const types = {
             default: 'desc',
             asc: 'desc',
             desc: 'asc'
            }
            

            
            const icon = icons[sortType]
            const type = types[sortType]
            const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)
            const output =  `<a href="${href}">
                 <i class="fa-solid ${icon}"></i>
             </a>`
             return new Handlebars.SafeString(output)
        }
}