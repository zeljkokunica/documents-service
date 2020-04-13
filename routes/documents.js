const express = require('express');
const router = express.Router();
const renderer = require('../lib/renderer');

/* GET document listing. */
router.get('/', function (req, res, next) {
    res.send('Documents');
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
                headerTemplate: "<div style='width: 100%; text-align: right'><span style='font-size: 24px;' class='pageNumber'></span><span style='font-size: 24px;'>/</span><span style='font-size: 24px;'class='totalPages'></span></div> ",
                margin: {
                    top: "60px"
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
