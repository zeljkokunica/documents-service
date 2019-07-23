const express = require('express');
const router = express.Router();
const renderer = require('../lib/renderer');

/* GET document listing. */
router.get('/', function (req, res, next) {
    res.send('Documents');
});

router.post('/:templateName/render', function (req, res, next) {
    const body = req.body;
    renderer.renderTemplateToStream(
        body.company,
        req.params.templateName,
        body.model,
        (stream) => {
            res.setHeader('Content-type', 'application/pdf');
            stream.pipe(res);
        }
    );
});


module.exports = router;
