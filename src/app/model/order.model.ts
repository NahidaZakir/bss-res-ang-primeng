export class Item {
  foodId: number;
  foodPackageId: number | undefined;
  quantity: number;
  unitPrice: number;
  totalPrice: number;

  constructor(
    foodId: number,
    quantity: number,
    unitPrice: number,
    totalPrice: number
  ) {
    this.foodId = foodId;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.totalPrice = totalPrice;
  }
}

export class OrderReqBody {
  tableId: number;
  orderNumber: string;
  amount: number;
  phoneNumber: string | undefined;
  items: Item[];

  constructor() {
    this.tableId = 0;
    this.orderNumber = '';
    this.amount = 0;
    this.phoneNumber = '';
    this.items = [];
  }
}

export interface allOrdersRespBody {
  data: [
    {
      id: string;
      orderNumber: string;
      amount: number;
      orderStatus: string;
      orderTime: string;
      table: {
        id: number;
        tableNumber: string;
        numberOfSeats: number;
        isOccupied: true;
        image: string;
        employees: [
          {
            employeeTableId: number;
            employeeId: string;
            name: string;
          }
        ];
      };
      orderedBy: {
        id: string;
        userName: string;
        email: string;
        fullName: string;
        phoneNumber: string;
        label: string;
        firstName: string;
        middleName: string;
        lastName: string;
        fatherName: string;
        motherName: string;
        spouseName: string;
        dob: string;
        address: string;
        nid: string;
        image: string;
        existingImage: string;
        facebook: string;
        instagram: string;
        genderId: number;
        genderName: string;
      };
      orderTakenBy: {
        id: string;
        userName: string;
        email: string;
        fullName: string;
        phoneNumber: string;
        label: string;
        firstName: string;
        middleName: string;
        lastName: string;
        fatherName: string;
        motherName: string;
        spouseName: string;
        dob: string;
        address: string;
        nid: string;
        image: string;
        existingImage: string;
        facebook: string;
        instagram: string;
        genderId: number;
        genderName: string;
      };
      orderItems: [
        {
          id: string;
          quantity: number;
          unitPrice: number;
          totalPrice: number;
          food: {
            id: number;
            name: string;
            description: string;
            price: number;
            discountType: string;
            discount: number;
            discountPrice: number;
            image: string;
          };
          foodPackage: {
            id: number;
            food: {
              id: number;
              name: string;
              description: string;
              price: number;
              discountType: string;
              discount: number;
              discountPrice: number;
              image: string;
            };
            package: {
              id: number;
              name: string;
              price: number;
            };
          };
        }
      ];
    }
  ];
  pageNumber: number;
  current_page: number;
  per_page: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  last_page: number;
  totalPages: number;
  totalRecords: number;
  total: number;
  from: number;
  to: number;
  next_page_url: string;
  prev_page_url: string;
}

export interface allOrders {
  id: string;
  orderNumber: string;
  amount: number;
  orderStatus: string;
  orderTime: string;
  table: {
    id: number;
    tableNumber: string;
    numberOfSeats: number;
    isOccupied: true;
    image: string;
    employees: [
      {
        employeeTableId: number;
        employeeId: string;
        name: string;
      }
    ];
  };
  orderedBy: {
    id: string;
    userName: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    label: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    spouseName: string;
    dob: string;
    address: string;
    nid: string;
    image: string;
    existingImage: string;
    facebook: string;
    instagram: string;
    genderId: number;
    genderName: string;
  };
  orderTakenBy: {
    id: string;
    userName: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    label: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    spouseName: string;
    dob: string;
    address: string;
    nid: string;
    image: string;
    existingImage: string;
    facebook: string;
    instagram: string;
    genderId: number;
    genderName: string;
  };
  orderItems: [
    {
      id: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      food: {
        id: number;
        name: string;
        description: string;
        price: number;
        discountType: string;
        discount: number;
        discountPrice: number;
        image: string;
      };
      foodPackage: {
        id: number;
        food: {
          id: number;
          name: string;
          description: string;
          price: number;
          discountType: string;
          discount: number;
          discountPrice: number;
          image: string;
        };
        package: {
          id: number;
          name: string;
          price: number;
        };
      };
    }
  ];
}
