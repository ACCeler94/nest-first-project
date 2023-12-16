import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/extended')
  getExtended(): any {
    return this.productsService.getExtended();
  }

  @Get('/extended/:id')
  async getExtendedById(
    @Param('id', new ParseUUIDPipe()) id: 'string',
  ): Promise<any> {
    const prod = await this.productsService.getExtendedById(id);
    if (!prod) {
      throw new NotFoundException('Product not found');
    } else {
      return prod;
    }
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: 'string'): Promise<any> {
    const prod = await this.productsService.getById(id);
    if (!prod) {
      throw new NotFoundException('Product not found');
    } else {
      return prod;
    }
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');
    await this.productsService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }

  @Put('/:id')
  async edit(
    @Body() newProductData: UpdateProductDTO,
    @Param('id', new ParseUUIDPipe()) id: 'string',
  ) {
    if (!(await this.productsService.getById(id)))
      throw new NotFoundException('Product not found');

    await this.productsService.editProduct(id, newProductData);
    return { success: true };
  }
}
