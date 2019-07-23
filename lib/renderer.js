const fs = require('fs');
const handlebars = require('handlebars');
const paths = require('./paths');
const puppeteer = require('puppeteer');

const defaultOptions = () => {
    {format: "A4"}
};

const readImage = (image) => {
    const bitmap = fs.readFileSync(image);
    return 'data:image/png;base64,' + new Buffer(bitmap).toString('base64');
};

const encodeImages = (company, model) => {
    const imagesPath = paths.getImagesPath(company);
    Object.getOwnPropertyNames(model).forEach((property) => {
        if (typeof model[property] == "object") {
            encodeImages(company, model[property]);
        }
        if (property.startsWith("image")) {
            model[property] = readImage(imagesPath + "/" + model[property]);
        }
    })
};

const renderToPdf = async (company, templateName, model, options) => {
    encodeImages(company, model);
    const templateFilePath = `${paths.getTemplatesPath(company)}/${templateName}`;
    console.log(`opening file ${templateFilePath}`);
    const templateSource = fs.readFileSync(`${paths.getTemplatesPath(company)}/${templateName}`, 'utf8');
    const compiledTemplate = handlebars.compile(templateSource);
    const rendered = compiledTemplate(model);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(rendered);
    const pdf = await page.pdf(options || defaultOptions());
    await browser.close();
    return pdf;
};

module.exports = {
    renderToPdf: renderToPdf
};
