import { Request, Response } from 'express';
import prisma from '../prisma';
import {
  CreateServiceDto,
  ServiceResponseDto,
  ServiceDetailResponseDto,
  ErrorResponseDto,
} from '../types/dto';
import { toServiceDto, toServiceDetailDto } from '../utils/mappers';

// POST /services
export async function createService(
  req: Request<{}, ServiceResponseDto | ErrorResponseDto, CreateServiceDto>,
  res: Response<ServiceResponseDto | ErrorResponseDto>,
): Promise<void> {
  const { companyId, name, description, price } = req.body;

  // The service must belong to a company that exists
  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) {
    res.status(404).json({ message: `Company with id ${companyId} not found` });
    return;
  }

  const service = await prisma.service.create({
    data: { companyId, name, description, price },
  });

  res.status(201).json(toServiceDto(service));
}

// GET /services/:id
export async function getServiceById(
  req: Request<{ id: string }>,
  res: Response<ServiceDetailResponseDto | ErrorResponseDto>,
): Promise<void> {
  const id = Number(req.params.id); // URL params are always strings

  const service = await prisma.service.findUnique({
    where: { id },
    include: { company: true },
  });

  if (!service) {
    res.status(404).json({ message: `Service with id ${id} not found` });
    return;
  }

  res.status(200).json(toServiceDetailDto(service));
}