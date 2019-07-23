const fs = require('fs');
const handlebars = require('handlebars');
const pdf = require('html-pdf');
const paths = require('./paths');
const defaultOptions = () => {format: 'Letter'};

const renderTemplateToStream = (company, templateName, model, streamHandler, options) => {
    model.imagesPath = paths.getImagesPath(company);
    const templateFilePath = `${paths.getTemplatesPath(company)}/${templateName}`;
    console.log(`opening file ${templateFilePath}`);
    const templateSource = fs.readFileSync(`${paths.getTemplatesPath(company)}/${templateName}`, 'utf8');
    const compiledTemplate = handlebars.compile(templateSource);
    const rendered = compiledTemplate(model);
    pdf
        .create(rendered, options || defaultOptions())
        .toStream(function(err, stream) {
            if (err) {
                return console.log(err);
            }
            streamHandler(stream);
        });
};

module.exports = {
    renderTemplateToStream: renderTemplateToStream
};
