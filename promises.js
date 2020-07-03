//Understanding asynchronous js

//write a program that compresses it , download it and uploads it 
//basic 

function download(url) {
    console.log(`Downloading from the ${url} `);

    setTimeout(() => {
        console.log(`Dowloaded completed ${url.split("/").pop()}`)
    } ,3000)
}
function compress(filePath , format) {
    console.log(`Compressing the file ${filePath}`);

    setTimeout(() => {
        console.log(`Compressed and saved as ${filePath.split(".").shift()}.${format}`)
    } ,1000)
}

function upload(server , file) {
    console.log(`Uploading ${file} into the ${server}`);

    setTimeout(() => {
        console.log(`File Uploaded to ${server}/${file}`)
    } ,2000)
}


download("https://www.netflix.com/Arjunreddy.mp4");
compress("mayabazar720p.mp4" ,"zip");
upload("https://www.aws.com/p1" , "profilepic.jpg");

