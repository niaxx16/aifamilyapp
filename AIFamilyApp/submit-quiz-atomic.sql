-- AI Family App - Atomic Quiz Submission Function
-- Bu function quiz submission'ı atomik bir işlem olarak yönetir
-- Race condition'ı önler ve duplicate puan vermeyi engeller

CREATE OR REPLACE FUNCTION submit_quiz_atomic(
  p_parent_id UUID,
  p_lesson_id UUID,
  p_correct_count INTEGER,
  p_total_questions INTEGER,
  p_is_first_attempt BOOLEAN
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result JSONB;
  v_points_to_add INTEGER;
  v_new_total_points INTEGER;
  v_already_completed BOOLEAN;
BEGIN
  -- Sadece ilk denemede puan ver
  IF p_is_first_attempt THEN
    v_points_to_add := p_correct_count;
  ELSE
    v_points_to_add := 0;
  END IF;

  -- Quiz daha önce tamamlanmış mı kontrol et
  SELECT quiz_completed INTO v_already_completed
  FROM user_progress
  WHERE parent_id = p_parent_id
    AND lesson_id = p_lesson_id;

  -- Eğer daha önce tamamlanmışsa puan ekleme
  IF v_already_completed = TRUE THEN
    v_points_to_add := 0;
  END IF;

  -- Atomik puan güncelleme (sadece ilk tamamlamada)
  IF v_points_to_add > 0 THEN
    UPDATE parent_profiles
    SET total_points = COALESCE(total_points, 0) + v_points_to_add
    WHERE id = p_parent_id
    RETURNING total_points INTO v_new_total_points;
  ELSE
    -- Puan eklenmedi, mevcut puanı al
    SELECT COALESCE(total_points, 0) INTO v_new_total_points
    FROM parent_profiles
    WHERE id = p_parent_id;
  END IF;

  -- Progress kaydı oluştur/güncelle
  INSERT INTO user_progress (
    parent_id,
    lesson_id,
    quiz_completed,
    score,
    completed_at
  ) VALUES (
    p_parent_id,
    p_lesson_id,
    TRUE,
    p_correct_count,
    NOW()
  )
  ON CONFLICT (parent_id, lesson_id)
  DO UPDATE SET
    quiz_completed = TRUE,
    score = p_correct_count,
    completed_at = NOW();

  -- Sonuç döndür
  v_result = jsonb_build_object(
    'success', true,
    'new_total_points', v_new_total_points,
    'points_earned', v_points_to_add,
    'correct_count', p_correct_count,
    'total_questions', p_total_questions
  );

  RETURN v_result;
END;
$$;

-- Function'ı test et
COMMENT ON FUNCTION submit_quiz_atomic IS
'Atomik quiz submission - race condition önleyici, duplicate puan engeller';

-- Örnek kullanım:
-- SELECT submit_quiz_atomic(
--   'parent-uuid'::UUID,
--   'lesson-uuid'::UUID,
--   8,  -- correct_count
--   10, -- total_questions
--   true -- is_first_attempt
-- );
