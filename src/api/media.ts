import baseRequest from '.'
interface IMediaParam {
  type: string
  resource: File
}

interface IUploadParam {
  file:File
  fileName: string
  token:string
  key:string
}

const resourceUrl = {
  addResource: '/resource',
  findResource: '/resource/',
  upToken: '/storage'
}

class MediaApi {
  static async addResourceRequest(data: IMediaParam) {
    return await baseRequest.post<IMediaParam>(resourceUrl.addResource, data)
  }

  static async findResourceRequest(id: string) {
    return await baseRequest.get(resourceUrl.findResource+id)
  }

  static async getUpToken() {
    return await baseRequest.get<{msg:string,data:string}>(resourceUrl.upToken)
  }

  static async upload(data: IUploadParam) {
    return await baseRequest.post<{hash:string,key:string}>('https://upload-z2.qiniup.com/',data)
  }
}

export default MediaApi
