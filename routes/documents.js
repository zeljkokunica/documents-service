const express = require('express');
const router = express.Router();
const renderer = require('../lib/renderer');

/* GET document listing. */
router.get('/', function (req, res, next) {
    res.send('Documents');
});

router.post('/:templateName/render', async (req, res, next) => {
    const body = req.body;
    const pdf = await renderer.renderToPdf(
        body.company,
        req.params.templateName,
        body.model
    );
    res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
    res.send(pdf);
});


module.exports = router;
