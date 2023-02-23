function objectFlip(obj) {
    const ret = {}
    Object.keys(obj).forEach(key => {
        ret[obj[key]] = key
    })
    return ret
}

export {objectFlip}