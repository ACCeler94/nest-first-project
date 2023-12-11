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
  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: 'string'): any {
    const prod = this.productsService.getById(id);
    if (!prod) {
      throw new NotFoundException('Product not found');
    } else {
      return prod;
    }
  }
  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: 'string'): any {
    if (!this.productsService.getById(id))
      throw new NotFoundException('Product not found');

    this.productsService.deleteById(id);
    return { success: true };
  }
  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }
  @Put('/:id')
  edit(
    @Body() newProductData: UpdateProductDTO,
    @Param('id', new ParseUUIDPipe()) id: 'string',
  ) {
    if (!this.productsService.getById(id))
      throw new NotFoundException('Product not found');

    this.productsService.editProduct(newProductData, id);
    return { success: true };
  }
}
