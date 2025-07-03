import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('Risk Assessments API (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Set global prefix to match main.ts configuration
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/risk-assessments', () => {
    it('should calculate risk for basic daily activities', async () => {
      const requestBody = {
        commuterId: 'COM-123',
        actions: [
          {
            timestamp: '2022-01-01 08:15:00',
            action: 'walked on sidewalk',
            unit: 'mile',
            quantity: 0.5
          },
          {
            timestamp: '2022-01-01 08:45:00',
            action: 'drove car',
            unit: 'minute',
            quantity: 30
          }
        ]
      };

      const response = await request(app.getHttpServer())
        .post('/api/risk-assessments')
        .send(requestBody)
        .expect(201);

      // Expected calculation:
      // walked on sidewalk: 0.5 miles × 0.5 = 0.25 micromorts
      // drove car: 30 minutes × 0.25 = 7.5 micromorts
      // Total: 7.75 micromorts
      expect(response.body).toEqual({
        commuterId: 'COM-123',
        risk: 7.75
      });
    });

    it('should calculate risk for high-risk activities', async () => {
      const requestBody = {
        commuterId: 'COM-1234',
        actions: [
          {
            timestamp: '2022-01-01 09:00:00',
            action: 'rode motorcycle',
            unit: 'minute',
            quantity: 15
          },
          {
            timestamp: '2022-01-01 14:30:00',
            action: 'rock climbing',
            unit: 'floor',
            quantity: 10
          }
        ]
      };

      const response = await request(app.getHttpServer())
        .post('/api/risk-assessments')
        .send(requestBody)
        .expect(201);

      // Expected calculation:
      // rode motorcycle: 15 minutes × 8.5 = 127.5 micromorts
      // rock climbing: 10 floors × 25 = 250 micromorts
      // Total: 377.5 micromorts
      expect(response.body).toEqual({
        commuterId: 'COM-1234',
        risk: 377.5
      });
    });

    it('should calculate risk for extreme activities', async () => {
      const requestBody = {
        commuterId: 'COM-12345',
        actions: [
          {
            timestamp: '2022-01-01 10:00:00',
            action: 'bungee jumping',
            unit: 'quantity',
            quantity: 1
          },
          {
            timestamp: '2022-01-01 15:00:00',
            action: 'skydiving',
            unit: 'minute',
            quantity: 5
          }
        ]
      };

      const response = await request(app.getHttpServer())
        .post('/api/risk-assessments')
        .send(requestBody)
        .expect(201);

      // Expected calculation:
      // bungee jumping: 1 quantity × 50 = 50 micromorts
      // skydiving: 5 minutes × 50 = 250 micromorts
      // Total: 300 micromorts
      expect(response.body).toEqual({
        commuterId: 'COM-12345',
        risk: 300
      });
    });

    it('should calculate risk for mixed unit types', async () => {
      const requestBody = {
        commuterId: 'COM-123',
        actions: [
          {
            timestamp: '2022-01-01 08:00:00',
            action: 'climbed stairs',
            unit: 'floor',
            quantity: 5
          },
          {
            timestamp: '2022-01-01 12:30:00',
            action: 'crossed street',
            unit: 'quantity',
            quantity: 3
          },
          {
            timestamp: '2022-01-01 17:00:00',
            action: 'jogged',
            unit: 'mile',
            quantity: 2
          }
        ]
      };

      const response = await request(app.getHttpServer())
        .post('/api/risk-assessments')
        .send(requestBody)
        .expect(201);

      // Expected calculation:
      // climbed stairs: 5 floors × 0.1 = 0.5 micromorts
      // crossed street: 3 quantity × 0.5 = 1.5 micromorts
      // jogged: 2 miles × 0.8 = 1.6 micromorts
      // Total: 3.6 micromorts
      expect(response.body).toEqual({
        commuterId: 'COM-123',
        risk: 3.6
      });
    });

    it('should handle very low risk activities with precision', async () => {
      const requestBody = {
        commuterId: 'COM-123',
        actions: [
          {
            timestamp: '2022-01-01 10:00:00',
            action: 'took elevator',
            unit: 'quantity',
            quantity: 5
          },
          {
            timestamp: '2022-01-01 12:00:00',
            action: 'ate meal',
            unit: 'quantity',
            quantity: 3
          }
        ]
      };

      const response = await request(app.getHttpServer())
        .post('/api/risk-assessments')
        .send(requestBody)
        .expect(201);

      // Expected calculation:
      // took elevator: 5 quantity × 0.02 = 0.1 micromorts
      // ate meal: 3 quantity × 0.01 = 0.03 micromorts
      // Total: 0.13 micromorts
      expect(response.body).toEqual({
        commuterId: 'COM-123',
        risk: 0.13
      });
    });

    it('should return 404 for non-existent commuter', async () => {
      const requestBody = {
        commuterId: 'COM-NONEXISTENT',
        actions: [
          {
            timestamp: '2022-01-01 10:00:00',
            action: 'walked on sidewalk',
            unit: 'mile',
            quantity: 1
          }
        ]
      };

      await request(app.getHttpServer())
        .post('/api/risk-assessments')
        .send(requestBody)
        .expect(404);
    });

    it('should return 404 for non-existent action', async () => {
      const requestBody = {
        commuterId: 'COM-123',
        actions: [
          {
            timestamp: '2022-01-01 10:00:00',
            action: 'non-existent action',
            unit: 'mile',
            quantity: 1
          }
        ]
      };

      await request(app.getHttpServer())
        .post('/api/risk-assessments')
        .send(requestBody)
        .expect(404);
    });

    it('should return 400 for actions on different days', async () => {
      const requestBody = {
        commuterId: 'COM-123',
        actions: [
          {
            timestamp: '2022-01-01 10:00:00',
            action: 'walked on sidewalk',
            unit: 'mile',
            quantity: 1
          },
          {
            timestamp: '2022-01-02 10:00:00', // Different day
            action: 'drove car',
            unit: 'minute',
            quantity: 30
          }
        ]
      };

      await request(app.getHttpServer())
        .post('/api/risk-assessments')
        .send(requestBody)
        .expect(400);
    });

    it('should return 400 for invalid unit/action combination', async () => {
      const requestBody = {
        commuterId: 'COM-123',
        actions: [
          {
            timestamp: '2022-01-01 10:00:00',
            action: 'walked on sidewalk',
            unit: 'minute', // Wrong unit - should be 'mile'
            quantity: 1
          }
        ]
      };

      await request(app.getHttpServer())
        .post('/api/risk-assessments')
        .send(requestBody)
        .expect(404);
    });
  });
});
