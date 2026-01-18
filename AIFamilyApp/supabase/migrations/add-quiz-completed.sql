-- Add quiz_completed column to user_progress table
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS quiz_completed BOOLEAN DEFAULT FALSE;

COMMENT ON COLUMN user_progress.quiz_completed IS 'Dersin quiz/etkinlik bolumu tamamlandi mi (ilk deneme icin puan verildi mi)';
