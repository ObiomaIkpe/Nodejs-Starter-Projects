const Product = require('../models/product')

const getAllProductsStatic =  async (req, res)=> {
    const products = await Product.find({featured:true})
    //const products = await Product.find({name: 'vase table'})
    //throw new Error('testing async error')
    res.status(200).json({products, nbHits: products.length})
}

const getAllProducts =  async(req, res) => {
    //const products = await Product.find(req.query)
    //console.log(req.query)
    const { featured, company, name } = req.query
    const queryObject = {}

    if (featured){
        queryObject.featured =  featured === 'true' ? true : false
    }

    if (company){
        queryObject.company = company
    }
    if (name){
        queryObject.name = {$regex : 'wo', $options: 'i'}
    }

    if (numericFilters){        
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '<' : '$lt',
            '<=' : '$lte',
            '=' : '$eq'
        }
        const regex = '/\b(<|>|<=|>=|=\b/g' 
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        //console.log(numericFilters)
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item)=>{
            const [field, operator, value] = item.split('-')
            if (options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        })
    }

    console.log(queryObject)
    let result = Product.find(queryObject)
    if (sort){
        const sortList = sort.split(',').join('')
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createdAt')
    }

    if (fields){
        const fieldsList = fields.split(',').join('')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const skip = (page -1) * limit 

    result = result.skip(skip).limit(limit)
    const products = await result
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {
    getAllProductsStatic, getAllProducts
}