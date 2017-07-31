var fs = require('fs'),
    // files = fs.readdirSync('./files'),
    clips = ['tomato.mp3','lettuce.mp3','salami.mp3'],
    stream,
    currentfile,
    dhh = fs.createWriteStream('./dhh.mp3');

    // create an array with filenames (time)
    // files.forEach(function (file) {
    //      clips.push(file);
    // });
    // console.log(files)
// recursive function
function main() {
    if (!clips.length) {
        dhh.end("Done");
        return;
    }
    currentfile = './files/' + clips.shift();
    console.log(currentfile)
    stream = fs.createReadStream(currentfile);
    stream.pipe(dhh, {end: false});
    stream.on("end", function() {
        // console.log(currentfile + ' appended');
        main();
    });
}
main();
