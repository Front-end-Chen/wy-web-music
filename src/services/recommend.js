import request from "./request";

//获取轮播图的请求
export function getTopBanners() {
    return request({
        url: '/banner'
    })
}

//获取热门推荐的请求，并限制获取的数据数量
export function getHotRecommends(limit) {
    return request({
        url: '/personalized',
        params: {
            limit
        }
    })
}

//获取新碟上架的请求，并限制获取的数据数量
export function getNewAlbums(limit) {
    return request({
        url: '/top/album',
        params: {
            limit
        }
    })
}

//获取榜单数据的请求
export function getTopList(idx) {
    return request({
        url: '/top/list',
        params: {
            idx
        }
    })
}