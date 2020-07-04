//Understanding Promises to use aync await
//open promises.js for next version of this code converting callbacks into promises


function download(url , downloaded) {
    console.log(`Downloading from the ${url} `);
    if(!url.startsWith('http')){
       return downloaded(new Error('url needs to start with http'))
    }

    setTimeout(() => {
        let savedFile = url.split("/").pop();
        console.log(`Dowloaded and saved as ${savedFile}`);
        //add we need to add err first parameter which will be null  
        downloaded(null ,savedFile)
    } ,3000)
}
function compress(filePath , format , compressed) {
    console.log(`Compressing the file ${filePath}`);
    if(['zip','fz','gzip'].indexOf(format)=== -1){
       return compressed(new Error ("We only support zip,fz and gzip formats"))
    }
    setTimeout(() => {
        let archive = `${filePath.split(".").shift()}.${format}`;
        console.log(`Compressed and saved as ${archive}`)
        compressed(null, archive)
    } ,1000)
}

function upload(server , file , uploaded) {
    console.log(`Uploading ${file} into the ${server}`);
    if(!server.startsWith('ftp://')){
       return uploaded(new Error("We can upload only to FTP servers"))
    }
    setTimeout(() => {
        let remotePath = `${server}/${file}`
        console.log(`File Uploaded to ${remotePath}`)
        uploaded(null, remotePath);
    } ,2000)
}
// need to change the format as we are using error first callback format
download("https://www.netflix.com/Manu.mp4" , (err ,file) => {
if(err) throw err;
compress(file,'zip', (err, archive)=>{
    //we the format doesn't match we can send the compressed file 
    if (err){
        console.warn(err);
        archive = file;
     }
     upload('ftp://file.com', archive ,(err) => {
         if(err) throw err;
     })
    })
});


//example of how it works
// task1( arg1 , (res1)=>{
//     task2(arg2 ,(res2)=>{
//         task3(args3 , (err,res3)=>{

//         })
//     })
// })
//since its error first callback adding err,callback
// task1(arg1 , (err1,data1)=>{
//     task2(arg2 ,(err2,data2)=>{
//         task3(args3 , (err3,data3)=>{

//         })
//     })
// })
