import { Controller, Post, Get, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {

    constructor(private productService : ProductService){}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO){
        const product = await this.productService.createProduct(createProductDTO)
        return res.status(HttpStatus.OK).json({
            message: 'Product Satisfactoriamente Creado',
            product: product
        });
    }

    @Get('/')
    async getProducts(@Res() res){
        const products = await this.productService.getProducts();
        res.status(HttpStatus.OK).json({
            products
        })
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID){
        const product = await this.productService.getProduct(productID);
        if(!product) throw new NotFoundException('El Producto No Existe');
        res.status(HttpStatus.OK).json({
            product
        })
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID){
        const product = await this.productService.deletedProduct(productID);
        if(!product) throw new NotFoundException('El Producto No Existe');
        res.status(HttpStatus.OK).json({ 
            message:'Se ha eliminado el product',
            product
        })
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID){
        const updatedProduct = await this.productService.updateProduct(productID,createProductDTO);
        if(!updatedProduct) throw new NotFoundException('El Producto No Existe');
        res.status(HttpStatus.OK).json({ 
            message:'Se ha actualizado el product',
            updatedProduct
        })
    }

}
