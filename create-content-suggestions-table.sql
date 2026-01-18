-- Create content_suggestions table for user content requests
CREATE TABLE IF NOT EXISTS content_suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  suggestion TEXT NOT NULL,
  parent_id UUID REFERENCES parent_profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'in_progress', 'completed', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_content_suggestions_parent_id ON content_suggestions(parent_id);
CREATE INDEX IF NOT EXISTS idx_content_suggestions_status ON content_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_content_suggestions_created_at ON content_suggestions(created_at DESC);

-- Enable Row Level Security
ALTER TABLE content_suggestions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own suggestions" ON content_suggestions;
DROP POLICY IF EXISTS "Users can create suggestions" ON content_suggestions;
DROP POLICY IF EXISTS "Users can update their own suggestions" ON content_suggestions;

-- Create RLS policies
-- Users can view their own suggestions
CREATE POLICY "Users can view their own suggestions"
  ON content_suggestions
  FOR SELECT
  USING (auth.uid() = parent_id);

-- Users can create suggestions
CREATE POLICY "Users can create suggestions"
  ON content_suggestions
  FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

-- Users can update their own suggestions (in case they want to edit)
CREATE POLICY "Users can update their own suggestions"
  ON content_suggestions
  FOR UPDATE
  USING (auth.uid() = parent_id)
  WITH CHECK (auth.uid() = parent_id);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_content_suggestions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS content_suggestions_updated_at ON content_suggestions;
CREATE TRIGGER content_suggestions_updated_at
  BEFORE UPDATE ON content_suggestions
  FOR EACH ROW
  EXECUTE FUNCTION update_content_suggestions_updated_at();

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON content_suggestions TO authenticated;
