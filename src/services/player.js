import request from "./request";

//获取歌曲详情请求
export function getSongDetail(ids) {
  return request({
    url: "/song/detail",
    params: {
      ids
    },
  });
}


