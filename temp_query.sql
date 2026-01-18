SELECT title, module_content->'parent_guide'->'cards' as cards FROM lessons WHERE title ILIKE '%yapay%zeka%' LIMIT 1;
