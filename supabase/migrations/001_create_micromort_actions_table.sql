-- Migration: Create micromort_actions table
-- Description: This table serves as the knowledge base for risk associated with different activities

-- Create ENUM type for unit values
CREATE TYPE unit_type AS ENUM ('mile', 'floor', 'minute', 'quantity');

CREATE TABLE IF NOT EXISTS micromort_actions (
    id BIGSERIAL PRIMARY KEY,
    action_name VARCHAR(255) UNIQUE NOT NULL,
    unit unit_type NOT NULL,
    micromorts_per_unit DECIMAL(10, 4) NOT NULL CHECK (micromorts_per_unit >= 0),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index on action_name for faster lookups
CREATE INDEX IF NOT EXISTS idx_micromort_actions_action_name ON micromort_actions(action_name);

-- Create index on unit for filtering
CREATE INDEX IF NOT EXISTS idx_micromort_actions_unit ON micromort_actions(unit);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_micromort_actions_updated_at 
    BEFORE UPDATE ON micromort_actions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
