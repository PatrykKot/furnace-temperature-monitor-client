import router from '../router/router'
import {cloneObject, extend} from "./objectUtils";

export function addQueryParams(queryParams, historyPush) {
    let route = getRoute()
    setQueryParams(extend(route.query, queryParams), historyPush)
}

export function setQueryParams(queryParams, historyPush) {
    let arg = {
        name: getRoute().name,
        query: deleteNullProperties(queryParams)
    }

    if (historyPush && historyPush != null) {
        router.push(arg)
    } else {
        router.replace(arg)
    }
}

export function queryParamOrDefault(name, defaultValue, converter) {
    let route = getRoute()
    let param = route.query[name]
    if (param != null) {
        if (converter) {
            return converter(param)
        } else {
            return param
        }
    } else {
        return defaultValue
    }
}

function getRoute() {
    return router.app.$route
}

function deleteNullProperties(obj) {
    let copied = cloneObject(obj)
    for (let propName in copied) {
        if (copied[propName] === null || copied[propName] === undefined) {
            delete copied[propName];
        }
    }

    return copied
}