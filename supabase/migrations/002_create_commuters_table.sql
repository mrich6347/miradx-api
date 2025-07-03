-- Migration: Create commuters table
-- Description: This table stores basic profile information for each commuter

CREATE TABLE IF NOT EXISTS commuters (
    commuter_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_commuters_email ON commuters(email);

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_commuters_updated_at 
    BEFORE UPDATE ON commuters 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();