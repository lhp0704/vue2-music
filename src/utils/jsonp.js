import jsonp from 'jsonp'
import {
  formatParams
} from '@/utils/index'

export default async (url, data, option) => {
  url += (url.indexOf('?') < 0 ? '?' : '&') + formatParams(data)

  return new Promise((resolve, reject) => {
    jsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}