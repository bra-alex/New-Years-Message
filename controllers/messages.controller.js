function getIndex(req, res) {
    res.status(200).render('index', {
        pageTitle: 'New Years Messages',
        errorMessage: undefined
    })
}

module.exports = {
    getIndex
}