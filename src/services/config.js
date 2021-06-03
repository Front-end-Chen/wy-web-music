//配置开发与生产url
const devBaseURL = "http://123.207.32.32:9001";
const proBaseURL = "http://123.207.32.32:9001";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;
//配置请求超时时间
export const TIMEOUT = 5000;
//配置获取的热门推荐的数据数量
export const HOT_RECOMMEND_LIMIT = 8;
//配置新碟上架的轮播页数与每页个数
export const NEW_ALBUM_PAGE_NUM = 2;
export const NEW_ALBUM_PER_PAGE = 5;