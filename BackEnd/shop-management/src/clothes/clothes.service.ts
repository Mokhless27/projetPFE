import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClothesRepository } from './clothes.repository';
import { CreateClothesDto } from './dto/create-clothes.dto';
import { Clothes } from './clothes.entity';
import { VariationRepository } from 'src/variation/variation.repository';
import { VariationService } from 'src/variation/variation.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
const uuid = require('uuid/v4');
const stripe = require('stripe')('sk_test_FMTMQn9KhGYSYWkCxIbYa6V0004HlMeaKM');
@Injectable()
export class ClothesService {
  constructor(
    @InjectRepository(ClothesRepository)
    private clothesRepository: ClothesRepository,
    // @InjectRepository(VariationRepository)
    // private variationRepository: VariationRepository,
    private variationService: VariationService,
  ) {}

  async createClothes(createClothesDto: CreateClothesDto): Promise<Clothes> {
    return this.clothesRepository.createClothes(createClothesDto);
  }

  async getClothes(): Promise<Clothes[]> {
    return await this.clothesRepository.find({ relations: ['variation'] });
  }

  async getClothesById(id: number): Promise<Clothes> {
    const found = await this.clothesRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return found;
  }

  async deleteClothes(id: number): Promise<void> {
    const result = await this.clothesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async updateClothes(
    id: number,
    createclothesDto: CreateClothesDto,
  ): Promise<Clothes> {
    const {
      category,
      discount,
      fullDescription,
      image,
      name,

      price,

      shortDescription,
      sku,
      tag,
    } = createclothesDto;

    const clothes = await this.getClothesById(id);

    if (name) {
      clothes.name = name;
    }

    if (shortDescription) {
      clothes.shortDescription = shortDescription;
    }

    if (price) {
      clothes.price = price;
    }

    if (fullDescription) {
      clothes.fullDescription = fullDescription;
    }

    if (sku) {
      clothes.sku = sku;
    }

    if (discount) {
      clothes.discount = discount;
    }
    if (tag) {
      clothes.tag = tag.split(',').map(tag => tag.trim());
    }
    if (image) {
      clothes.image = image.split(',').map(image => image.trim());
    }
    if (category) {
      clothes.category = category.split(',').map(category => category.trim());
    }

    await clothes.save();
    return clothes;
  }

  async addVariation(idC: number, idV: number): Promise<Clothes> {
    const variation = await this.variationService.VarFindById(idV);
    const clothes = await this.clothesRepository.findOne(idC);
    clothes.variation.push(variation);
    clothes.save();
    return clothes;
  }

  async checkout(createCheckoutDto: CreateCheckoutDto) {
    let error;
    let status;
    try {
      const { product, token } = createCheckoutDto;

      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });

      const idempotency_key = uuid();
      const charge = await stripe.charges.create(
        {
          //product.price * 100
          amount: product, // * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
          //description: `Purchased the ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip,
            },
          },
        },
        {
          idempotency_key,
        },
      );
      console.log('Charge:', { charge });
      status = 'success';
    } catch (error) {
      console.error('Error:', error);
      status = 'failure';
    }

    return { error, status };
  }

  // similarClothes() {
  //   const spawn = require('child_process').spawn;
  //   const process = spawn('python', ['../../../similar_clothes.py']);
  //   process.stdout.on('data', data => {
  //     console.log(data.toString());
  //   });
  // }
}
