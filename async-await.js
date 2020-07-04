//converting promises into async-await
//to avoid callback hells -> promises got introduced and to avoid to many then and catch -> async and await are introduced
//body is same as promises only the way we call them varies
function download(url) {
    console.log(`Downloading from ${url}`)
    return new Promise((resolve , reject)=>{
         if(!url.startsWith('http')){
            return reject(new Error("url should contain http"))
         }
         
         setTimeout(()=>{
            let savedFile =  url.split("/").pop();
            console.log(`Downloaded and saved ${savedFile}`)
            resolve(savedFile);         
        },3000)
    })
    
}

function compress(file , format) {
    console.log(`compressing the file : ${file}`)
    return new Promise((resolve , reject)=>{
         if(['zip','gzip','7z'].indexOf(format) == -1){
            return reject(new Error("supports only zip , gzip and 7z formats"))
         }
         
         setTimeout(()=>{
            let archive = file.split(".").shift()+"."+format;
            console.log(`compressed and saved as ${archive}`)
            resolve(archive);         
        },1000)
    })
    
}

function upload(server , file) {
    console.log(`Uploading ${file} into ${server}`)
    return new Promise((resolve , reject)=>{
         if(!server.startsWith('ftp://')){
            return reject(new Error("we only transfer to FTP server"))
         }
         
         setTimeout(()=>{
            console.log(`Uploaded into ${server}/${file}`)         
        },2000)
    })
    
}


//traditional promises calling style
//  download("http://www.zee5.com/satya.png")
//      .then((file)=> compress(file , 'zip'))
//      .then((archive) => upload("ftp://files.com", archive))

//async and awit which makes all promises into one bulk promise

async function task(){
    try{
     const file = await download("http://www.zee5.com/satya.png");
     const archive = await compress(file ,'lzip');
     await upload("ftp://files.com", archive);
    } catch(err){
        console.error(err)
    }
}

console.log("task started")
task().then( ()=> console.info("task actually completed"));
console.log("task completed") // this line gets printed before completing the task
//thats what we mean as async
