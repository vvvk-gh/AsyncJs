// //Ideally we want to write 
// const file = download("http://site.com/profilepic.jpg")
// const zip = compress(file , zip);
// upload("ftp://files.com" , zip)

// in the below functions you always gonna return a new promise
// and it has 2 parameters 1st is resolve and 2nd is reject
//if condition is satisfied it goes to resolve and from resolve to then 
//else it go to reject state and which go to catch state handles the errors

function download(url) {

    return new Promise( (resolve , reject) => {
    
        console.log(`Downloading from the ${url} `);
            if(!url.startsWith('http')){
                reject(new Error('url needs to start with http'))
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
       reject(new Error ("We only support zip,fz and gzip formats"))
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
       reject(new Error("We can upload only to FTP servers"))
    }
    setTimeout(() => {
        let remotePath = `${server}/${file}`
        console.log(`File Uploaded to ${remotePath}`)
        resolve(remotePath);
    } ,2000)
    })
}

// //1st method
// download("http://www.amazonprime.com/amazonlogo.png")
//     .then((file)=>{
//         compress(file , 'zip')
//             .then((archive) => {
//                 upload("ftp://files.com" , archive)
//             })
//     })

//we can simplify it as the following
download("http://www.amazon.com/amazonlogo.png")
    .then( (file) => compress(file , 'zip'))
    .then((archive) =>upload("ftp://files.com" ,archive) )

