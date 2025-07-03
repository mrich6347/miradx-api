import { Test, TestingModule } from '@nestjs/testing';
import { RiskAssessmentsController } from './risk-assessments.controller';
import { RiskAssessmentsService } from './risk-assessments.service';
import { DatabaseService } from '../../database/database.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UnitType } from './dto/risk-assessments.dto';

describe('RiskAssessmentsController', () => {
  let controller: RiskAssessmentsController;
  let service: RiskAssessmentsService;

  const mockDatabaseService = {
    client: {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn(),
      insert: jest.fn()
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RiskAssessmentsController],
      providers: [
        RiskAssessmentsService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService
        }
      ],
    }).compile();

    controller = module.get<RiskAssessmentsController>(RiskAssessmentsController);
    service = module.get<RiskAssessmentsService>(RiskAssessmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createRiskAssessment', () => {
    const validDto = {
      commuterId: 'COM-123',
      actions: [
        {
          timestamp: '2022-01-01 10:05:11',
          action: 'walked on sidewalk',
          unit: UnitType.MILE,
          quantity: 0.4
        },
        {
          timestamp: '2022-01-01 10:30:09',
          action: 'rode a shark',
          unit: UnitType.MINUTE,
          quantity: 3
        }
      ]
    };

    it('should create risk assessment successfully', async () => {
      // Mock commuter exists
      mockDatabaseService.client.single.mockResolvedValueOnce({
        data: { commuter_id: 'COM-123' },
        error: null
      });

      // Mock micromort actions lookup
      mockDatabaseService.client.single
        .mockResolvedValueOnce({
          data: { micromorts_per_unit: 0.5 },
          error: null
        })
        .mockResolvedValueOnce({
          data: { micromorts_per_unit: 1000 },
          error: null
        });

      // Mock insert
      mockDatabaseService.client.insert.mockResolvedValueOnce({
        error: null
      });

      const result = await controller.createRiskAssessment(validDto);

      expect(result).toEqual({
        commuterId: 'COM-123',
        risk: 3000 // (0.4 * 0.5) + (3 * 1000) = 0.2 + 3000 = 3000.2 rounded to 3000
      });
    });

    it('should throw NotFoundException for invalid commuter', async () => {
      mockDatabaseService.client.single.mockResolvedValueOnce({
        data: null,
        error: { message: 'Not found' }
      });

      await expect(controller.createRiskAssessment(validDto))
        .rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException for different day timestamps', async () => {
      const invalidDto = {
        ...validDto,
        actions: [
          {
            timestamp: '2022-01-01 10:05:11',
            action: 'walked on sidewalk',
            unit: UnitType.MILE,
            quantity: 0.4
          },
          {
            timestamp: '2022-01-02 10:30:09', // Different day
            action: 'rode a shark',
            unit: UnitType.MINUTE,
            quantity: 3
          }
        ]
      };

      // Mock commuter exists
      mockDatabaseService.client.single.mockResolvedValueOnce({
        data: { commuter_id: 'COM-123' },
        error: null
      });

      await expect(controller.createRiskAssessment(invalidDto))
        .rejects.toThrow(BadRequestException);
    });
  });
});
