module.exports.Paginate = ({limit,page}) => {
    if (!limit || limit < 1) limit = 10
    if (!page || page < 1) page = 1

    return {
        limit,
        page,
        offset: limit * (page-1)
    }
}