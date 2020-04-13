const express = require('express');
const router = express.Router();
const renderer = require('../lib/renderer');

/* GET document listing. */
router.get('/', function (req, res, next) {
    res.send('Documents');
});

router.post('/render-test', async (req, res, next) => {
    try {
        const body = req.rawBody;
        const pdf = await renderer.htmlToPdf(
            body,
            {
                format: "A4",
                displayHeaderFooter: true,
                headerTemplate: "<p></p>",
                footerTemplate: "<div style='width: 100%; text-align: right; padding-right: 30px;'><span style='font-size: 12px;' class='pageNumber'></span><span style='font-size: 12px;'>/</span><span style='font-size: 12px;'class='totalPages'></span></div> ",
                margin: {
                    bottom: "40px"
                }
            }
        );
        res.set({'Content-Type': 'application/pdf', 'Content-Length': pdf.length});
        res.send(pdf);
    } catch (e) {
        next(e);
    }
});

router.post('/:templateName/render', async (req, res, next) => {
    try {
        const body = req.body;
        const pdf = await renderer.renderToPdf(
            body.company,
            req.params.templateName,
            body.model,
            {
                format: "A4",
                displayHeaderFooter: true,
                headerTemplate: "<p></p>",
                footerTemplate: "<div style='width: 100%; text-align: right; padding-right: 30px;'><span style='font-size: 12px;' class='pageNumber'></span><span style='font-size: 12px;'>/</span><span style='font-size: 12px;'class='totalPages'></span></div> ",
                margin: {
                    bottom: "40px"
                }
            }
        );
        res.set({'Content-Type': 'application/pdf', 'Content-Length': pdf.length});
        res.send(pdf);
    } catch (e) {
        next(e);
    }
});


module.exports = router;
