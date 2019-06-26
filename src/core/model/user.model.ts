export interface User {
  email: string;
  userName: string;
  roles: string[];
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: Address;
}

interface Address {
  city: string;
  street: string;
  zipCode: string;
  lat: number;
  lng: number;
}
