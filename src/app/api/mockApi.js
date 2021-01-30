import { delay } from '../common/util/util'
import { sampleData } from './sampleData'

export function festchSampleData() {
  return delay(1000).then(function () {
    return Promise.resolve(sampleData)
  })
}
