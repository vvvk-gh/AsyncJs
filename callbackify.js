//with callbackify we can call callback styled function call even though  

const util = require('util');

function download(url) {

    return new Promise( (resolve , reject) => {
    
        console.log(`Downloading from the ${url} `);
            if(!url.startsWith('http')){
              return reject(new Error('url needs to start with http'))
            }
    
        setTimeout(() => {
            let savedFile = url.split("/").pop();
            console.log(`Dowloaded and saved as ${savedFile}`);
            resolve(savedFile)
        } ,3000)
        
    })
}

function compress(filePath , format) {
    return new Promise ((resolve , reject) => {
        
    console.log(`Compressing the file ${filePath}`);
    if(['zip','fz','gzip'].indexOf(format)=== -1){
       return reject(new Error ("We only support zip,fz and gzip formats"))
    }
    setTimeout(() => {
        let archive = `${filePath.split(".").shift()}.${format}`;
        console.log(`Compressed and saved as ${archive}`)
        resolve(archive)
    } ,1000)
    })
}

function upload(server , file) {
    return new Promise((resolve,reject)=>{
    console.log(`Uploading ${file} into the ${server}`);
    if(!server.startsWith('ftp://')){
       return reject(new Error("We can upload only to FTP servers"))
    }
    setTimeout(() => {
        let remotePath = `${server}/${file}`
        console.log(`File Uploaded to ${remotePath}`)
        resolve(remotePath);
    } ,2000)
    })
}

//converted promises to callbacks
downloadCb = util.callbackify(download)
compressCb = util.callbackify(compress)
uploadCb = util.callbackify(upload)

//call the promises in the callback style
downloadCb("https://www.netflix.com/Manu.mp4" , (err ,file) => {
if(err) throw err;
compressCb(file,'zip', (err, archive)=>{
    //we the format doesn't match we can send the compressed file 
    if (err){
        console.warn(err);
        archive = file;
     }
     uploadCb('ftp://file.com', archive ,(err) => {
         if(err) throw err;
     })
    })
});


