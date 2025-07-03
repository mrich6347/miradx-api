-- Migration: Seed commuters table
-- Description: Insert initial commuter records with specified commuter IDs

INSERT INTO commuters (commuter_id, name, email) VALUES
    ('COM-123', 'Test Commuter 1', 'commuter1@example.com'),
    ('COM-1234', 'Test Commuter 2', 'commuter2@example.com'),
    ('COM-12345', 'Test Commuter 3', 'commuter3@example.com')
ON CONFLICT (commuter_id) DO NOTHING;

-- Note: Using ON CONFLICT DO NOTHING to prevent errors if running migration multiple times
