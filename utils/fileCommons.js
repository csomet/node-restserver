const isAllowedExtension = (filename) => {

    let extensions = process.env.EXTENSIONS.split(",");
    if (extensions.indexOf(filename.name.split(".")[1]) >= 0){
        return true;
    } else {
        return false;
    }
}

module.exports = isAllowedExtension;