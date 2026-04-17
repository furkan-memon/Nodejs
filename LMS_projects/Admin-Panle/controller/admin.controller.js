const Admin = require('../model/admin.model');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

export const addAdminPage = async(req, res) => {
    try {
        if(req.cookies && req.cookies.user && req.cookies.user._id != undefined)
            return res.render("admin/addAdmin");
        else
            return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

export const viewAllAdmins = async(req, res) => {
    try {
        let search = req.query.search ? req.query.search : "";
        let user = req.cookies.user;
        let admins = await Admin.find({
            $or: [
                {
                    "firstname": {$regex: search, $options: "i"}
                },
                {
                    "lastname": {$regex: search, $options: "i"}
                },
            ]
        })
        // .sort({lastname: -1});
        return res.render("admin/viewAdmin", { admins, user });
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

export const addAdmin = async(req, res) => {
    try {
       let imagepath = "";
       if(req.file){
        imagepath = `/uploads/${req.file.filename}`;
       }
       let hashpassword = await bcrypt.hash(req.body.password, 10);


       let admin = await Admin.create({
        ...req.body,
        password: hashpassword,
        profileImage: imagepath
       });
       console.log('Admin Added Success');
       return res.redirect("/admin/add-admin");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}

export const deleteAdmin = async(req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if(!admin){
            return res.redirect("/admin/view-admins");
        }
        if(admin.profileImage != ""){
            let imagePath = path.join(__dirname, "..", admin.profileImage);
            try {
                await fs.unlinkSync(imagePath);
            } catch (error) {
                console.log('File Missing...');
            }
        }

        await Admin.findByIdAndDelete(admin._id);
       
       return res.redirect("/admin/view-admins");
    } catch (error) {
        console.log(error);
        return res.redirect("/dashboard");
    }
}