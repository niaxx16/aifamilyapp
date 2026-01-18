-- 2. hafta etkinliklerini kontrol et
SELECT
  id,
  title,
  description,
  week_number,
  age_min,
  age_max,
  reflection_question,
  created_at
FROM activities
WHERE week_number = 2 AND age_min = 6 AND age_max = 7
ORDER BY created_at;
