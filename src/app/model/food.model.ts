export interface getFoodDatatable{
  data: [
    {
      id: number,
      name: "string",
      description: "string",
      price: number,
      discountType: "string",
      discount: number,
      discountPrice: number,
      image: "string"
    }
  ],
  pageNumber: number,
  current_page: number,
  per_page: number,
  pageSize: number,
  firstPage: "string",
  lastPage: "string",
  last_page: number,
  totalPages: number,
  totalRecords: number,
  total: number,
  from: number,
  to: number,
  next_page_url: "string",
  prev_page_url: "string"
}


export class addFoodReqBody{
  name: string;
  description: string;
  price: number;
  discountType: number;
  discount: number;
  discountPrice: number;
  image: string;
  base64: string;
  constructor() {
    this.name = '';
    this.description = '';
    this.price = 0;
    this.discountType = 0;
    this.discount = 0;
    this.discountPrice = 0 ;
    this.image = '';
    this.base64 = '';
  }
}
