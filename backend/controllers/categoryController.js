import Category from "../models/categoryModel.js"

export const allCategory = async(req, res)=>{
    let filters={}
    if(req.query.fromAdmin==='false') {
        filters.isDeleted = false
    }
    const category = await Category.find(filters)
    res.status(200).json(category)
}

export const getCategory = async(req,res)=>{
    const category = await Category.findOne({slug: req.params.slug})
    res.status(200).json(category)
}

export const createCategory = async(req,res)=>{
    let slug = req.body.name.replace(/ /g,"-").toLowerCase()
    let slugExist = await Category.findOne({slug})
    let counter = 2
    while(slugExist){
        slug = `${slug}-${counter}`
        slugExist =await Category.findOne({slug})
        counter++
    }
    const newCategory = new Category({slug, name:req.body.name})
    const category = await newCategory.save()

    res.status(200).json(category)
}

export const editCategory = async(req,res)=>{
    let slug = req.body.name.replace(/ /g,"-").toLowerCase()
    let slugExist = await Category.findOne({slug})
    let counter = 2
    while(slugExist){
        slug = `${slug}-${counter}`
        slugExist =await Category.findOne({slug})
        counter++
    }
    const editCategory = await Category.findOneAndUpdate({_id: req.params.id}, {name:req.body.name, slug:slug},{new:true})
    
    if(!editCategory){
        return res.status(500).send('Couldn\'t edit category')
    }

    res.status(200).json('Category updated successfully')
}


export const deleteCagetory = async(req,res)=>{
    const _id = req.params.id
    const isDeleted = await Category.findOneAndUpdate({_id}, {isDeleted:true}, {new:true})
    if(!isDeleted){
        return res.status(500).send('Couldn\'t delete category')
    }
    
    res.status(200).send("category deleted succesfully")
}

export const restoreCagetory = async(req,res)=>{
    const _id = req.params.id   
    const isRestored = await Category.findOneAndUpdate({_id}, {isDeleted:false}, {new:true})
    if(!isRestored){
        return res.status(500).send('Couldn\'t restore category')
    }
    res.status(200).send("category restored succesfully")
}