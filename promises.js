//Understanding asynchronous js

//write a program that compresses it , download it and uploads it 
//as our outputs gives an outputs not in a order we execute them so we need to handle them using callbacks
//adding callbacks 

function download(url , downloaded) {
    //this console statement will print immediatly as soon as its called
    //passed string gets copied into url and displays in below statement
    console.log(`Downloading from the ${url} `);

    setTimeout(() => {
    //after 3s the console statement will be printed
        let savedFile = url.split("/").pop();
        console.log(`Dowloaded and saved as ${savedFile}`);
        // the downloaded here is a callback its sends the savedfile value into the function as we
        //know the downloaded has a compressed function it will call compress function
        downloaded(savedFile)
    } ,3000)
}
function compress(filePath , format , compressed) {
    //since its called its prints its console statement
    //filepath is passed from downloaded you can check below calling function and format is copied from compressed fncall in download function
    console.log(`Compressing the file ${filePath}`);
 
    setTimeout(() => {
        //after 1s console statement will be printed
        let archive = `${filePath.split(".").shift()}.${format}`;
        console.log(`Compressed and saved as ${archive}`)
        //compressed callback sends the archive as the paramter to upload function
        compressed(archive)
    } ,1000)
}

function upload(server , file , uploaded) {
    //upload gets callled
    //prints the below immdtly
    console.log(`Uploading ${file} into the ${server}`);

    setTimeout(() => {
        //after 2s prints the console statement
        let remotePath = `${server}/${file}`
        console.log(`File Uploaded to ${remotePath}`)
        uploaded(remotePath);
    } ,2000)
}

//since you have 2 arguments we will pass a string as 1st and a function as 2nd arg
//dowloads gets called   
download("https://www.netflix.com/Manu.mp4" , (file) => {
// we adding a callback inside a callback
// since compress has 3 arguments we gonna send 3 and 3rd one is an callbackfunction    
// here we are using the same file
compress(file,'zip', (archive)=>{
     //calling upload
     upload('https://file.com', archive ,() => {})
    })
});

