import { Config } from '../types'
export class BaseConverter {
  public formatMethods: Config[keyof Config]['formats']
  public attributeMethods: Config[keyof Config]['attributes']
  public orderInConfig: string[]
  public orderInDefault: string[]

  constructor(config?: Config['html'] | Config['markdown']) {
    this.orderInConfig = config?.order || []
    this.orderInDefault = []
  }

  orderNames(names: string[]) {
    return names.sort((a, b) => {
      if (
        this.orderInConfig.indexOf(a) > -1 &&
        this.orderInConfig.indexOf(b) > -1
      ) {
        return this.orderInConfig.indexOf(a) - this.orderInConfig.indexOf(b)
      }
      if (
        this.orderInDefault.indexOf(a) > -1 &&
        this.orderInDefault.indexOf(b) > -1
      ) {
        return this.orderInDefault.indexOf(a) - this.orderInDefault.indexOf(b)
      }
      return 0
    })
  }

  getFormatMethods(names: string[]) {
    return this.orderNames(names)
      .map((name) => this.formatMethods[name])
      .filter((o) => !!o)
  }

  getAttributeMethods(names: string[]) {
    return this.orderNames(names)
      .map((name) => this.attributeMethods[name])
      .filter((o) => !!o)
  }

  getConvertMethods(names: string[]) {
    return [...this.getFormatMethods(names), ...this.getAttributeMethods(names)]
  }
}
