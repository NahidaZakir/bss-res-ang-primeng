export interface AllTable {
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
  data: [
    {
      id: number;
      tableNumber: string;
      numberOfSeats: number;
      isOccupied: boolean;
      image: string;
      employees: [
        {
          employeeTableId: number;
          employeeId: string;
          name: string;
        }
      ];
    }
  ];
}

export interface showAllTable {
  id: number;
  tableNumber: string;
  numberOfSeats: number;
  isOccupied: boolean;
  image: string;
  employees: [
    {
      employeeTableId: number;
      employeeId: string;
      name: string;
    }
  ];
}

export class createTableReqBody {
  tableNumber: string;
  numberOfSeats: number;
  image: string;
  base64: string;
  constructor() {
    this.tableNumber = '';
    this.numberOfSeats = 0;
    this.image = '';
    this.base64 = '';
  }
}

//for url/get
export interface getAllTable {
  employeeTableId: number;
  employee: {
    employeeId: string;
    name: string;
  };
  table: {
    tableId: number;
    tableNumber: string;
  };
}

export class addEmployeeToTableReqBody {
  employeeId: string;
  tableId: number;
  constructor() {
    this.employeeId = '';
    this.tableId = 0;
  }
}
