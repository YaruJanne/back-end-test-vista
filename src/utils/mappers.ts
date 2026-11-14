import { Company, Service } from '@prisma/client';
import { CompanyResponseDto, ServiceResponseDto, ServiceDetailResponseDto } from '../types/dto';

export const toServiceDto = (s: Service): ServiceResponseDto => ({
  id: s.id,
  companyId: s.companyId,
  name: s.name,
  description: s.description,
  price: Number(s.price), // Prisma Decimal → plain number for JSON
});

export const toCompanyDto = (
  c: Company & { services: Service[] },
): CompanyResponseDto => ({
  id: c.id,
  name: c.name,
  registrationNumber: c.registrationNumber,
  services: c.services.map(toServiceDto),
});

export const toServiceDetailDto = (
  s: Service & { company: Company },
): ServiceDetailResponseDto => ({
  ...toServiceDto(s),
  company: {
    id: s.company.id,
    name: s.company.name,
    registrationNumber: s.company.registrationNumber,
  },
});