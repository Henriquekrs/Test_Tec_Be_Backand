import { IProduct } from '../interfaces/IProduct';
import ProductModel from '../models/ProductModel';
import {
  ServiceResponse,
  ServiceResponseError,
  ServiceResponseSuccess,
} from '../types/ServiceResponse';

export default class ProductService {
  constructor(private productModel = new ProductModel()) {}

  async getAll(): Promise<ServiceResponse<IProduct[]>> {
    try {
      const products = await this.productModel.getAll();
      if (!products) {
        return {
          status: 'BAD_REQUEST',
          data: { message: 'Data not found' },
        };
      }
      const response: ServiceResponseSuccess<IProduct[]> = {
        status: 'SUCCESSFUL',
        data: products,
      };
      return response;
    } catch (error) {
      const response: ServiceResponseError = {
        status: 'BAD_REQUEST',
        data: { message: 'Error internal' },
      };
      return response;
    }
  }

  async getById(productId: string): Promise<ServiceResponse<IProduct>> {
    try {
      const product = await this.productModel.getById(productId);
      if (!product) {
        return {
          status: 'BAD_REQUEST',
          data: { message: 'Data not found' },
        };
      }
      const response: ServiceResponseSuccess<IProduct> = {
        status: 'SUCCESSFUL',
        data: product,
      };
      return response;
    } catch (error) {
      const response: ServiceResponseError = {
        status: 'BAD_REQUEST',
        data: { message: 'Error internal' },
      };
      return response;
    }
  }
}
