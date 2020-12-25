export class CreateClothesDto {
  sku: string;

  name: string;

  price: number;

  discount: number;
  offerEnd: string;

  nEw: boolean;

  rating: number;

  saleCount: number;
  category: string; //[string];
  tag: string; // [string];
  // variation: [
  //   {
  //     color: string;
  //     image: string;
  //     size: [
  //       {
  //         name: string;
  //         stock: number;
  //       },
  //     ];
  //   },
  // ];

  image: string; //[string];

  shortDescription: string;

  fullDescription: string;
}
