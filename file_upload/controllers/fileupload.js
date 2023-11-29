//abhi db me kuch store kia hi ni local store kia h data files nd all
const File = require('../models/File')
const cloudinary = require('cloudinary').v2

//local file upload handler function
//client ke pc se data leke, server ke kisi path pr store krta hai


//uploading file on server
exports.localfileupload = async (req,res)=>{ 
    try{
        //saving on server path 

        //fetichin file from req 
        
        const file = req.files.file
        console.log(file)
        //here all file object will be there and we need to specify extension which type of file it is like jpg or wot we can find it with name present inthis obj

        //finding server path
        // files is where we have to upload
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`

        //moving file to server
        file.mv(path, (err)=>{
            console.log(err);
        })

        res.json(
            { 
                success:true,
                message:"file uploaded successfully"
            }
        )

    }catch(err){
        console.log(err);
        res.json(
            {
                success:false,
                message:"file not uploaded"
            }
        )
    }
}

//image upload ka handler

exports.imageUpload = async (req,res)=>{
    try{
        const {name, email, tags} = req.body;
        console.log(name, email, tags)

        const file = req.files.imageFile;
        console.log(file)

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"]
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isSupportedFileType(fileType, supportedTypes)){
            return res.status(500).json({
                success:false,
                message:"file type not supported"
            })
        }

        //file type supported so save in cloudinary
        const response = await uploadFunction(file, "Deew")
        console.log("response" , response)
 
        //db me entry save
        try {
            const dbentry = await File.create({ 
                name, tags, email, imageUrl: response.secure_url
            });  
            console.log('Entry created successfully:', dbentry);
        } catch (error) {
            console.error('Error creating entry:', error);
        }

        res.json({
            success:true,
            message:"image uploaded to cloudinary"  
        })

    }catch(err){
        console.log(err);
        res.status(200).json(
            {
                success : false, 
                message: "image cannot be uploaded"
            }
        )  
    }
} 

//video upload
exports.videoUpload = async (req,res)=>{
    try{
        const {name, email, tags} = req.body;
        const file = req.files.videoFile;

        const supportedVideos = ["mp3","mp4","mov"];
        const videoType = file.name.split('.')[1];
        if(!videoSupported(videoType, supportedVideos)){
            return res.json({
                success:false,
                message:"video type not supported" 
            })    
        }

        const response = await uploadFunction(file, "Deew");
        const dbentry = await File.create({name,email,tags,imageUrl:response.secure_url})

        res.json({
            success:true,
            message:"video uploaded"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}

function isSupportedFileType(type, supportedTypes){
    return supportedTypes.includes(type);
}

function videoSupported(type, supportedVideos){
    return supportedVideos.includes(type);
}

async function uploadFunction(file, folder){
    const options = {
        folder : folder
        // resource_type: 'video',
    };
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options)
} 
async function uploadFunctionCompressor(file, folder, quality){
    const options = {
        folder : folder
        // resource_type: 'video',
    };
    options.resource_type = "auto"
    if(quality){
        options.quality = quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath, options)
} 

//image size reducer
//image upload ka handler
 
exports.imagecompressor = async (req,res)=>{
    try{
        const {name, email, tags} = req.body;
        const file = req.files.imageFile;

        const supportedTypes = ["jpg", "jpeg", "png"]
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isSupportedFileType(fileType, supportedTypes)){
            return res.status(500).json({
                success:false,
                message:"file type not supported"
            })
        }

        //file type supported so save in cloudinary
        //30 is qulaity given
        const response = await uploadFunctionCompressor(file, "Deew",10 )
 
        //db me entry save
        try {
            const dbentry = await File.create({ 
                name, tags, email, imageUrl: response.secure_url
            });  
            console.log('Entry created successfully:', dbentry);
        } catch (error) {
            console.error('Error creating entry:', error);
        }

        res.json({ 
            success:true,
            message:"image uploaded to cloudinary"  
        })

    }catch(err){
        console.log(err);
        res.status(200).json(
            {
                success : false, 
                message: "image cannot be uploaded"
            }
        )  
    }
} 