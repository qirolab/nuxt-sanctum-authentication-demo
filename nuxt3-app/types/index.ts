declare global {
  interface ValidationErrors {
    [key: string]: string[];
  }

  interface User {
    id: number;
    name: string;
    email: string;
  }
}
