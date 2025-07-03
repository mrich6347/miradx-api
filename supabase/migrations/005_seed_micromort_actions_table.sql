-- Migration: Seed micromort_actions table
-- Description: Insert initial micromort action data for risk calculations

INSERT INTO micromort_actions (action_name, unit, micromorts_per_unit, description) VALUES
    -- Walking activities (per mile)
    ('walked on sidewalk', 'mile', 0.5, 'Walking on a sidewalk - very low risk activity'),
    ('walked in city', 'mile', 1.2, 'Walking in urban areas with traffic'),
    ('walked on highway', 'mile', 15.0, 'Walking along highways - higher risk due to vehicle proximity'),
    ('jogged', 'mile', 0.8, 'Jogging or running exercise'),
    ('hiked', 'mile', 2.5, 'Hiking on trails with natural hazards'),
    
    -- Climbing activities (per floor)
    ('climbed stairs', 'floor', 0.1, 'Climbing stairs in buildings'),
    ('rock climbing', 'floor', 25.0, 'Rock climbing - high risk activity'),
    ('ladder climbing', 'floor', 5.0, 'Climbing ladders for work or maintenance'),
    
    -- Time-based activities (per minute)
    ('drove car', 'minute', 0.25, 'Driving a personal vehicle'),
    ('rode motorcycle', 'minute', 8.5, 'Riding a motorcycle - significantly higher risk than car'),
    ('flew commercial', 'minute', 0.02, 'Commercial airline flight - very safe per minute'),
    ('rode bicycle', 'minute', 1.5, 'Bicycle riding in traffic'),
    ('rode shark', 'minute', 1000.0, 'Extremely dangerous hypothetical activity'),
    ('skydiving', 'minute', 50.0, 'Skydiving activity - high risk per minute'),
    ('swimming', 'minute', 0.5, 'Swimming in supervised areas'),
    ('deep sea diving', 'minute', 15.0, 'Scuba diving activity'),
    
    -- Quantity-based activities (per occurrence)
    ('ate meal', 'quantity', 0.01, 'Eating a regular meal - minimal risk'),
    ('crossed street', 'quantity', 0.5, 'Crossing a street at crosswalk'),
    ('took elevator', 'quantity', 0.02, 'Using an elevator'),
    ('smoked cigarette', 'quantity', 17.0, 'Smoking one cigarette - long term health risk'),
    ('drank alcohol', 'quantity', 2.5, 'Consuming one alcoholic drink'),
    ('extreme sports', 'quantity', 100.0, 'Participating in extreme sports activities'),
    ('bungee jumping', 'quantity', 50.0, 'One bungee jump'),
    ('played contact sport', 'quantity', 5.0, 'Playing contact sports like football or rugby')
ON CONFLICT (action_name) DO NOTHING;

-- Values are approximations for demonstration purposes
