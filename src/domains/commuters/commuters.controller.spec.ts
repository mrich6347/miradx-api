import { Test, TestingModule } from '@nestjs/testing';
import { CommutersController } from './commuters.controller';
import { CommutersService } from './commuters.service';
import { DatabaseService } from '../../database/database.service';

describe('CommutersController', () => {
  let controller: CommutersController;
  let service: CommutersService;

  const mockDatabaseService = {
    client: {
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      ilike: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({
        data: [
          {
            commuter_id: 'COM-123',
            name: 'Test Commuter 1',
            email: 'commuter1@example.com',
            created_at: '2025-01-03T10:30:00.000Z',
            updated_at: '2025-01-03T10:30:00.000Z'
          }
        ],
        error: null
      })
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommutersController],
      providers: [
        CommutersService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService
        }
      ],
    }).compile();

    controller = module.get<CommutersController>(CommutersController);
    service = module.get<CommutersService>(CommutersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCommuters', () => {
    it('should return commuters data', async () => {
      const query = { name: 'Test' };
      const result = await controller.getCommuters(query);
      
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('count');
      expect(Array.isArray(result.data)).toBe(true);
      expect(typeof result.count).toBe('number');
    });

    it('should handle empty query', async () => {
      const query = {};
      const result = await controller.getCommuters(query);
      
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('count');
    });
  });
});
