export interface Person {
  Name: string;
  Position: string;
  Category: string;
  Institution: string;
}

export interface Institution {
  Name: string;
  Person: Person[];
}

export interface Category {
  Name: string;
  Institution: Institution[];
}