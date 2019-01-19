export function cloneObject(object) {
    return JSON.parse(JSON.stringify(object))
}

export function extend(parent, child) {
    let parentCopy = cloneObject(parent ? parent : {})
    let childCopy = cloneObject(child ? child : {})

    Object.keys(childCopy).forEach(key => {
        parentCopy[key] = childCopy[key]
    })

    return parentCopy
}