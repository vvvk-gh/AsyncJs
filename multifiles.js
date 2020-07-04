//try downloading multiple files using async await
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
        },1500)
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
            resolve(file)         
        },500)
    })
    
}


// //async hell
// async function task(){
//     try{
//      const stratTime = new Date().getTime()
//      const file1 = await download("http://www.zee5.com/satya.png");
//      const file2 = await download("http://www.zee5.com/satya2.png");
//      const file3 = await download("http://www.zee5.com/satya3.png");
//      const archive1 = await compress(file1 ,'zip');
//      const archive2 = await compress(file2 ,'zip');
//      const archive3 = await compress(file3 ,'zip');
//      await upload("ftp://files.com", archive1);
//      await upload("ftp://files.com", archive2);
//      await upload("ftp://files.com", archive3);
//      console.log((new Date().getTime()/stratTime) / 1000)
//     } catch(err){
//         console.error(err)
//     }
// }


// console.log("task started")
// task().then( ()=> console.info("task actually completed"));
// // this line gets printed before completing the task and thats what we mean as async
// console.log("task completed") 


///to avoid this async-await hell we can do the following

async function task1() {
    const file1 = await download("http://www.zee5.com/satya1.png");
    const archive1 = await compress(file1 ,'zip');
    await upload("ftp://files.com", archive1);
}

async function task2() {
    const file2 = await download("http://www.zee5.com/satya2.png");
    const archive2 = await compress(file2 ,'zip');
    await upload("ftp://files.com", archive2);
}

async function task3() {
    const file3 = await download("http://www.zee5.com/satya3.png");
    const archive3 = await compress(file3 ,'zip');
    await upload("ftp://files.com", archive3);
}



// async function task(){
//     try{
//      const startTime = new Date().getTime()
//      //completed the tasks first
//      completed1 = task1()
//      completed2 = task2() 
//      completed3 = task3()
     
//      //and wait for the to be completed tasks nexr
//      await completed1;
//      await completed2;
//      await completed3;

//      console.log((new Date().getTime()-startTime) / 1000)
//     } catch(err){
//         console.error(err)
//     }
// }


// console.log("task started")
// task().then( ()=> console.info("task actually completed"));
// // this line gets printed before completing the task and thats what we mean as async
// console.log("task completed") 


//promise.all

Promise.all([
    task1(),
    task2(),
    task3()
]).then(()=> console.log(`all the tasks completed`))