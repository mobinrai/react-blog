import Category from "../models/categoryModel.js"
import Post from "../models/postModel.js"

export const allCategory = async(req, res)=>{
    const category = await Category.find()
    res.status(200).json(category)
}

export const getCategory = async(req,res)=>{
    const category = await Category.findOne({slug: req.params.slug})
    // if(!category){
    //     throw new Error('Could not find category')
    // }
    // const posts = await Post.find({ category: category._id })
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