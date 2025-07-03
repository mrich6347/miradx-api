-- Migration: Create risk_assessments table
-- Description: This table stores a history of every risk calculation performed for users

CREATE TABLE IF NOT EXISTS risk_assessments (
    id BIGSERIAL PRIMARY KEY,
    commuter_id VARCHAR(50) NOT NULL,
    calculated_risk_micromorts DECIMAL(10, 4) NOT NULL CHECK (calculated_risk_micromorts >= 0),
    assessment_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    input_actions_json JSONB NOT NULL,
    CONSTRAINT fk_risk_assessments_commuter_id 
        FOREIGN KEY (commuter_id) 
        REFERENCES commuters(commuter_id) 
        ON DELETE CASCADE
);

-- Create index on commuter_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_risk_assessments_commuter_id ON risk_assessments(commuter_id);

-- Create index on assessment_timestamp for time-based queries
CREATE INDEX IF NOT EXISTS idx_risk_assessments_timestamp ON risk_assessments(assessment_timestamp);

-- Create composite index for commuter + timestamp queries
CREATE INDEX IF NOT EXISTS idx_risk_assessments_commuter_timestamp 
    ON risk_assessments(commuter_id, assessment_timestamp DESC);

-- Create GIN index on JSONB column for efficient JSON queries
CREATE INDEX IF NOT EXISTS idx_risk_assessments_input_actions_gin 
    ON risk_assessments USING GIN (input_actions_json);

