import { Request, Response } from 'express';
import prisma from '../prisma';
import { CreateCompanyDto, CompanyResponseDto } from '../types/dto';
import { toCompanyDto } from '../utils/mappers';

// POST /companies
export async function createCompany(
  req: Request<{}, CompanyResponseDto, CreateCompanyDto>,
  res: Response<CompanyResponseDto>,
): Promise<void> {
  const { name, registrationNumber } = req.body;

  const company = await prisma.company.create({
    data: { name, registrationNumber },
    include: { services: true },
  });

  res.status(201).json(toCompanyDto(company)); // 201 = Created
}

// GET /companies
export async function getCompanies(
  _req: Request,
  res: Response<CompanyResponseDto[]>,
): Promise<void> {
  const companies = await prisma.company.findMany({
    include: { services: true }, // join each company's services
    orderBy: { id: 'asc' },
  });

  res.status(200).json(companies.map(toCompanyDto));
}