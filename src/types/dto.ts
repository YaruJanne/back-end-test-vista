// ---------- Request DTOs (what the client sends) ----------
export interface CreateCompanyDto {
  name: string;
  registrationNumber: string;
}

export interface CreateServiceDto {
  companyId: number;
  name: string;
  description: string;
  price: number;
}

// ---------- Response DTOs (what the API returns) ----------
export interface ServiceResponseDto {
  id: number;
  companyId: number;
  name: string;
  description: string;
  price: number;
}

export interface CompanyResponseDto {
  id: number;
  name: string;
  registrationNumber: string;
  services: ServiceResponseDto[];
}

export interface ErrorResponseDto {
  message: string;
  errors?: { field: string; message: string }[];
}

export interface ServiceDetailResponseDto extends ServiceResponseDto {
  company: {
    id: number;
    name: string;
    registrationNumber: string;
  };
}