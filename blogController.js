const express = require('express')
const mongoose = require('mongoose');
const shortid = require('shortid');
const response = require('./../lib/responseLib')
const check = require('./../lib/checkLib')
const time = require('./../lib/timeLib')
const logger = require('./../lib/loggerLib')

//Importing the model here 
const BlogModel = mongoose.model('Blog')

let getAllBlog = (req, res) => {
    
    BlogModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message,'Blog Controller: All Blog',10)
                let apiResponse = response.generate(true, 'Failed to find blog details',500,null )
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.success('No Blog Found','Blog Controller: All Blog')
                let apiResponse = response.generate(true, 'no blog found',404,null )
                res.send(apiResponse)
            } else {
                logger.success('Blog Found Succcesfully','Blog Controller: All Blog',20)
                let apiResponse = response.generate(false, 'Blogs created successfuly',200,result )
                res.send(apiResponse)
            }
        })
}// end get all blogs

/**
 * function to read single blog.
 */
let viewByBlogId = (req, res) => {

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            console.log(err)
            logger.error(err.message,'Blog Controller: viewByBlogId',10)
            let apiResponse = response.generate(true, 'Failed to find blog details',500,null )
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.success('No Blog Found','Blog Controller: viewByBlogId')
            let apiResponse = response.generate(true, 'no blog found',404,null )
            res.send(apiResponse)
        } else {
            logger.success('Blog Found Succcesfully','Blog Controller: viewByBlogId',20)
            let apiResponse = response.generate(false, 'Blog found successfuly',200,result )
            res.send(apiResponse)
        }
    })
}

/**
 * function to read blogs by category.
 */
let viewByCategory = (req, res) => {

    BlogModel.find({ 'category': req.params.category }, (err, result) => {

        if (err) {
            console.log(err)
            logger.error(err.message,'Blog Controller: viewByCategory',10)
            let apiResponse = response.generate(true, 'Failed to find blog details',500,null )
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.success('No Blog Found','Blog Controller: viewByCategory')
            let apiResponse = response.generate(true, 'no blog found',404,null )
            res.send(apiResponse)
        } else {
            logger.success('Blog Found Succcesfully','Blog Controller: viewByCategory',20)
            let apiResponse = response.generate(false, 'Blogs found successfuly',200,result )
            res.send(apiResponse)
        }
    })
}

/**
 * function to read blogs by author.
 */
let viewByAuthor = (req, res) => {

    BlogModel.find({ 'author': req.params.author }, (err, result) => {

        if (err) {
            console.log(err)
            logger.error(err.message,'Blog Controller: viewByAuthor',10)
            let apiResponse = response.generate(true, 'Failed to find blog details',500,null )
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.success('No Blog Found','Blog Controller: viewByAuthor')
            let apiResponse = response.generate(true, 'no blog found',404,null )
            res.send(apiResponse)
        } else {
            logger.success('Blog Found Succcesfully','Blog Controller: viewByAuthor',20)
            let apiResponse = response.generate(false, 'Blogs found successfuly',200,result )
            res.send(apiResponse)
        }
    })
}

/**
 * function to edit blog by admin.
 */
let editBlog = (req, res) => {

    let options = req.body;
    console.log(options);
    BlogModel.update({ 'blogId': req.params.blogId }, options, { multi: true }).exec((err, result) => {

        if (err) {
            console.log(err)
            logger.error(err.message,'Blog Controller: editBlog',10)
            let apiResponse = response.generate(true, 'Failed to edit blog details',500,null )
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.success('No Blog Found','Blog Controller: editBlog')
            let apiResponse = response.generate(true, 'No blog found with the given details to edit',404,null )
            res.send(apiResponse)
        } else {
            logger.success('Blog Found Succcesfully','Blog Controller: editBlog',20)
            let apiResponse = response.generate(false, 'Blogs updated successfuly',200,result )
            res.send(apiResponse)
        }
    })
}



/**
 * function to delete the assignment collection.
 */
let deleteBlog = (req, res) => {
    BlogModel.remove({ 'blogId': req.params.blogId }, (err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message,'Blog Controller: deleteBlog',10)
            let apiResponse = response.generate(true, 'Failed to delete the blog',500,null )
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.success('No Blog Found','Blog Controller: deleteBlog')
            let apiResponse = response.generate(true, 'no blog found to delete with the given details',404,null )
            res.send(apiResponse)
        } else {
            logger.success('Blog Found Succcesfully','Blog Controller: deleteBlog',20)
            let apiResponse = response.generate(false, 'Blogs deleted successfuly',200,result )
            res.send(apiResponse)
        }
    })
}

/**
 * function to create the blog.
 */
let createBlog = (req, res) => {
    let gTime = time.now()
    let lTime = time.convertToLocalTime(gTime)
    let blogId = shortid.generate()

    let newBlog = new BlogModel({

        blogId: blogId,
        title: req.body.title,
        description: req.body.description,
        bodyHtml: req.body.blogBody,
        isPublished: true,
        category: req.body.category,
        author: req.body.fullName,
        created: gTime,
        lastModified: gTime,
        views:0
    }) // end new blog model

    let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
    newBlog.tags = tags

    newBlog.save((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message,'Blog Controller: createBlog',10)
            let apiResponse = response.generate(true, 'Failed to create blog details',500,null )
            res.send(apiResponse)
        } else {
            logger.success('Blog Found Succcesfully','Blog Controller: createBlog',20)
            let apiResponse = response.generate(false, 'Blogs created successfuly',200,result )
            res.send(apiResponse)
        }
    }) // end new blog save
}

/**
 * function to increase views of a blog.
 */
let increaseBlogView = (req, res) => {

    BlogModel.findOne({ 'blogId': req.params.blogId }, (err, result) => {

        if (err) {
            logger.error(err.message,'Blog Controller: increaseBlogView',10)
            let apiResponse = response.generate(true, 'Failed to increase the blog Views',500,null )
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.success('No Blog Found','Blog Controller: increaseBlogView')
            let apiResponse = response.generate(true, 'No Blog Found',404,null )
            res.send(apiResponse)
        } else {
            
            result.views += 1;
            result.save(function (err, result) {
                if (err) {
                    logger.error(err.message,'Blog Controller: increaseBlogView',10)
                    let apiResponse = response.generate(true, 'some database error',500,null )
                    res.send(apiResponse)
                }
                else {
                    logger.success('Blog Found Succcesfully','Blog Controller: increaseBlogView',20)
                    let apiResponse = response.generate(false, 'Blog view updated successfully',200,result )
                    res.send(apiResponse)

                }
            });// end result

        }
    })
}




module.exports = {
    getAllBlog: getAllBlog,
    createBlog: createBlog,
    viewByBlogId: viewByBlogId,
    viewByCategory: viewByCategory,
    viewByAuthor: viewByAuthor,
    editBlog: editBlog,
    deleteBlog: deleteBlog,
    increaseBlogView: increaseBlogView
}