const resources = async(router, controllers, name, pre) => {
    path = (pre === undefined) ? `/${name}` : pre + `${name}`
    member_path = (pre === undefined) ? `/${name}/:id` : pre + `${name}/:id`
    router.get(path, controllers.index)
    router.post(path, controllers.checkParams, controllers.create)
    router.get(member_path, controllers.getRecord, controllers.show)
    router.patch(member_path, [controllers.getRecord, controllers.checkParams], controllers.update)
    router.delete(member_path, controllers.getRecord, controllers.destroy)
}

module.exports = resources