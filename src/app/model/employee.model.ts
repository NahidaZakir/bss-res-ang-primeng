export class updateReqBody{
  designation: string;
  constructor(){
    this.designation = '';
  }
}

export interface Employee {
  id: string;
  designation: string;
  joinDate: string;
  amountSold: number | null;
  user: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fullName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    genderId: number;
    genderName: string;
    fatherName: string;
    motherName: string;
    spouseName: string;
    nid: string;
    address: string | null;
    facebook: string | null;
    instagram: string | null;
    label: string | null;
    image: string;
    existingImage: string;
  };
}


export class addEmployeeReqBody{
  designation: string;
  joinDate: string;
  email: string;
  phoneNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  spouseName: string;
  dob: string;
  nid: string;
  genderId: number;
  image: string;
  base64: string;
  constructor(){
    this.designation='';
    this.joinDate='',
    this.email='',
    this.phoneNumber='';
    this.firstName='';
    this.middleName='';
    this.lastName='';
    this.fatherName='';
    this.motherName='';
    this.spouseName='';
    this.dob='';
    this.nid='';
    this.genderId=0;
    this.image='';
    this.base64='';
  }
}

export interface getAllEmployees{
    employeeId: string,
    name: string;
  }

