/********
* user.js file (services/users)
********/

const express = require('express');
// const User = require('../../models/User_Registration.js');
const Categories = require('../../models/Admin/Categoris/categoris.js');
const Sub_Categories = require('../../models/Admin/Categoris/sub_category.js');
const Child_sub_Categories = require('../../models/Admin/Categoris/child_sub_category.js');
const Master_Course = require('../../models/Admin/Categoris/Course.js');
const Abc = require('../../constant.js')

const app = express();
app.set('secretKey', 'nodeRestApi');



const Create_Categories = async (req, res, next) => {

try{
    const {
        category_name,
    } = req.body

    if (category_name === undefined || category_name === '') {
        debugger
        return res.status(422).json({
            'code': 'REQUIRED_FIELD_MISSING',
            'description': 'Your Body id Empty pls check',
            'field': 'category_name'
        });
    }

    let issCategoryname = await Categories.findOne({
           "category_name" : category_name
    })

       if(issCategoryname){
        return res.status(409).json({
            'code': 'ENTITY_ALREAY_EXISTS',
            'description': 'category_name already exists',
            'field': 'category_name'
        });
       }

       for(var i = 0; i < req.files.length; i++){
        debugger  
        var fff = req.files[i].originalname;
        var AAA = Abc.URL + req.files[i].path;
        debugger
        }

       const temp = {
        category_name : category_name,
        category_image : fff,
        category_path : AAA
       }

       let issCategoriescreate = await Categories.create(temp)

       if(issCategoriescreate){
        return res.status(200).json({
            'Message': 'user updated successfully',
             status : true,
            'data': issCategoriescreate
        });
            }  
}
catch(error){
    debugger
    return res.status(500).json({
        'code': 'SERVER_ERROR',
        'description': 'something went wrong, Please try again'
    });
}
}

const sub_Create_Categories = async (req, res, next) => {
    try{
        
        const {
            sub_category_name,
            category_Id
        } = req.body
    
        if (sub_category_name === undefined || sub_category_name === '') {
            debugger
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Your Body id Empty pls check',
                'field': 'sub_category_name'
            });
        }
    
        let issCategoryname = await Sub_Categories.findOne({
               "sub_category_name" : sub_category_name
        })
    
           if(issCategoryname){
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'category_name already exists',
                'field': 'category_name'
            });
           }
    
           for(var i = 0; i < req.files.length; i++){
            debugger  
            var fff = req.files[i].originalname;
            var AAA = Abc.URL + req.files[i].path;
            debugger
            }
    
           const temp = {
            sub_category_name : sub_category_name,
            sub_category_image : fff,
            sub_category_path : AAA,
            category_id : category_Id
           }
    
           let issCategoriescreate = await Sub_Categories.create(temp)
    
           if(issCategoriescreate){
            return res.status(200).json({
                'Message': 'user updated successfully',
                 status : true,
                'data': issCategoriescreate
            });
                } 
    }
    catch(error){
        debugger
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const child_sub_Create_Categories = async (req, res, next) => {

    try{
       
        const {
            child_sub_category_name,
            category_Id,
            sub_category_Id
        } = req.body
    
        if (child_sub_category_name === undefined || child_sub_category_name === '') {
            debugger
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Your Body id Empty pls check',
                'field': 'child_sub_category_name'
            });
        }
    
        let isschild_sub_Categoryname = await Child_sub_Categories.findOne({
               "child_sub_category_name" : child_sub_category_name
        })
    
           if(isschild_sub_Categoryname){
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'category_name already exists',
                'field': 'category_name'
            });
           }
    
           for(var i = 0; i < req.files.length; i++){
            debugger  
            var fff = req.files[i].originalname;
            var AAA = Abc.URL + req.files[i].path;
            debugger
            }
    
           const temp = {
            child_sub_category_name : child_sub_category_name,
            child_sub_category_image : fff,
            child_sub_category_path : AAA,
            category_id : category_Id,
            sub_category_id : sub_category_Id
           }
    
           let issCategoriescreate = await Child_sub_Categories.create(temp)
    
           if(issCategoriescreate){
            return res.status(200).json({
                'Message': 'user updated successfully',
                 status : true,
                'data': issCategoriescreate
            });
                } 
    }
    catch(error){
        debugger
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const Master_Course_Categories =  async (req, res, next) =>{

    try{
        const {
            course_name,
            course_video,
            course_path,
            regular_price,
            sale_price,
            course_description,
            course_Athorname,
            course_buy,
            category_Id,
            sub_category_Id,
            child_category_Id
        } = req.body
    
        if (course_name === undefined || course_name === '') {
            debugger
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Your Body id Empty pls check',
                'field': 'child_sub_category_name'
            });
        }
        if (regular_price === undefined || regular_price === '') {
            debugger
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Your Body id Empty pls check',
                'field': 'child_sub_category_name'
            });
        }
        if (sale_price === undefined || sale_price === '') {
            debugger
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Your Body id Empty pls check',
                'field': 'child_sub_category_name'
            });
        }
        if (course_description === undefined || course_description === '') {
            debugger
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Your Body id Empty pls check',
                'field': 'child_sub_category_name'
            });
        }
        if (course_Athorname === undefined || course_Athorname === '') {
            debugger
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Your Body id Empty pls check',
                'field': 'child_sub_category_name'
            });
        }
        if (course_Athorname === undefined || course_Athorname === '') {
            debugger
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Your Body id Empty pls check',
                'field': 'child_sub_category_name'
            });
        }
    
        let issCourseawait = await Master_Course.findOne({
               "course_name" : course_name
        })
    
           if(issCourseawait){
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'category_name already exists',
                'field': 'category_name'
            });
           }
    
           for(var i = 0; i < req.files.length; i++){
            debugger  
            var fff = req.files[i].originalname;
            var AAA = Abc.URL + req.files[i].path;
            debugger
            }
    
           const temp = {
            course_name : course_name,
            regular_price : regular_price,
            sale_price : sale_price,
            course_description : course_description,
            course_Athorname : course_Athorname,
            course_buy : course_buy,
            course_video : fff,
            course_path : AAA,
            
            category_id : category_Id,
            sub_category_id : sub_category_Id,
            Chile_sub_category_id : child_category_Id
           }
    
           let issCourse = await Master_Course.create(temp)
    
           if(issCourse){
            return res.status(200).json({
                'Message': 'user updated successfully',
                 status : true,
                'data': issCourse
            });
        }
    }
    catch(error){
        debugger
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

module.exports = {
Create_Categories : Create_Categories,
sub_Create_Categories : sub_Create_Categories,
child_sub_Create_Categories : child_sub_Create_Categories,
Master_Course_Categories : Master_Course_Categories
}