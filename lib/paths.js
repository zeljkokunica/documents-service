const getTemplatesPath = (company) => {
    let templatesFolder;
    if (process.argv.length > 2) {
        templatesFolder = process.argv[2];
    } else {
        let appPath = process.argv[1].replace("/app.js", "");
        templatesFolder = `${appPath}/templates`;
    }
    return `${templatesFolder}/${company.toLowerCase()}`;
};

const getImagesPath = (company) => {
    if (process.argv.length > 3) {
        return process.argv[3];
    }
    return `${getTemplatesPath(company)}/img`;
};

module.exports = {
    getTemplatesPath: getTemplatesPath,
    getImagesPath: getImagesPath
};