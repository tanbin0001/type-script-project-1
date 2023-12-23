import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';
import fs from 'fs';




cloudinary.config({ 
  cloud_name: 'dhxd918cq', 
  api_key: '736225596626671', 
  api_secret: 'cuhi0XY8s8t5V8EDftdd2l_vK9s' 
});


export const sendImageToCloudinary = (imageName: string, path: string)  =>{

return new Promise((resolve, reject) => {
  cloudinary.uploader.upload( path,
    { public_id:  imageName }, 
    function(error, result) {
      if(error){
        reject(error)
      }resolve(result)
      fs.unlink(path, (err) => {
        if(err){
          console.log(err);
        } 
      })
      
    });

   
   
    
  
})


   
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd()+'/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

export const upload = multer({ storage: storage })