import {ErrorHandlingEntity} from '../../../shared/utils'

export interface SkuModel extends ErrorHandlingEntity {
    product_id: string
    sku: string
    name: string
    ranking: number
    weight: number
    discount: number
    price: number
    status: boolean
}
