const util = require('util');
//asychronous js
function download(url , downloaded) {
    console.log(`Downloading from ${url}`);
    //conditional err-first 
    if(!url.startsWith("http://")){
        return downloaded(new Error("Url always starts with http://"))
    }  
    setTimeout( ()=>{
        let SavedFile = `${url.split('/').pop()}`
    console.log(`Downloaded and saved as ${SavedFile}`)
        downloaded(null,SavedFile);
    },2000)


}
function compress(file , format ,compressed) {
    console.log(`compressing the ${file}`);
    if(['zip','gzip','7z'].indexOf(format) == -1){
        return compressed(new Error("only zip , gzip , 7z are allowed formats"))
    }
    setTimeout( ()=>{
        let archive = `${file.split('.').shift()}.${format}`
        console.log(`compressed and saved as ${archive}`)
        compressed(null,archive)
    },1500)
}

function upload(server, file , uploaded) {
    console.log(`uploading the ${file} into the ${server}`)
    if(!server.startsWith("ftp://")){
        return uploaded(new Error("We only transfer to FTP servers"))
    }
    setTimeout( ()=>{
        let remoteUrl = `${server}/${file}`
        console.log(`uploaded the ${file} into ${remoteUrl} `)
        uploaded(null,remoteUrl)
    },1000)
}

//actual calling 1st time
// download("https://www.imagesearch.com/charan.jpg" , function downloaded(file){
//     console.log(`${file} is Downloaded`)
// })
// compress("charan.jpg" , 'zip' ,function compressed(archive){
// console.log(`compressed and saved as ${archive}`)
// })
// upload("charan.zip" , "ftp://aws" , () => {})

//2nd type calling error first callbacks

// download("http://flipkart.com/bluetshirt.png" , (err , file) =>{
//     if(err) throw err;
//     compress(file ,"zip" , (err ,archive) => {
//         if(err){
//         console.warn(err);
//         archive = file;
//         }
//         upload("ftp://files.com" , archive , (err)=>{
//             if (err) throw err;
//         })
//     })
// })


//3nd type : converting callbacks into promises using promisify these should be error first callbacks  

// let downloadPromise =  util.promisify(download);
// let compressPromise = util.promisify(compress);
// let uploadPromise = util.promisify(upload);

// downloadPromise("http://holymoly/thisisnotokay.png")
//  .then((file)=> compressPromise(file,'zip'))
//  .then((archive)=> uploadPromise(archive, "ftp://aws/") )


//changing the callbacks into promises
//4 method of writing asynchronuos

function download(url) {
    console.log(`Downloading from ${url}`);
    //conditional err-first
    return new Promise((resolve , reject) =>{
        if(!url.startsWith("http://")){
        //return downloaded(new Error("Url always starts with http://"))
        return reject(new Error("Url always starts with http://"))
    }  
    setTimeout( ()=>{
        let SavedFile = `${url.split('/').pop()}`
    console.log(`Downloaded and saved as ${SavedFile}`)
        //downloaded(SavedFile);
        resolve(SavedFile);
    },2000)

    }) 
    

}
function compress(file , format ) {
    console.log(`compressing the ${file}`);

    return new Promise((resolve , reject) => {
        
    if(['zip','gzip','7z'].indexOf(format) == -1){
        //return compressed(new Error("only zip , gzip , 7z are allowed formats"))
        return reject(new Error("only zip , gzip , 7z are allowed formats"))
    }
    setTimeout( ()=>{
        let archive = `${file.split('.').shift()}.${format}`
        console.log(`compressed and saved as ${archive}`)
        //compressed(archive)
        resolve(archive)
    },1500)

    })
}

function upload(server, file) {
    console.log(`uploading the ${file} into the ${server}`)
    return new Promise((resolve , reject) =>{
        if(!server.startsWith("ftp://")){
        //return uploaded(new Error("We only transfer to FTP servers"))
        return reject(new Error("We only transfer to FTP servers"))
    }
    setTimeout( ()=>{
        let remoteUrl = `${server}/${file}`
        console.log(`uploaded the ${file} into ${remoteUrl} `)
        //uploaded(remoteUrl)
        resolve(remoteUrl)
    },1000)
    })
}


download("http://oa_apu.com/masthuchesavu.png")
    .then((file) => compress(file , 'zip'))
    .then((archive) => upload("ftp://avahayami.com" , archive) )