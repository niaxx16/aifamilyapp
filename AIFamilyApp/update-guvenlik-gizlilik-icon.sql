-- Güvenlik ve Gizlilik kategorisindeki tüm derslerin ikonlarını güncelle
UPDATE lessons
SET icon = 'icon-guvenlik-gizlilik'
WHERE category = (
  SELECT id FROM categories WHERE name = 'Güvenlik ve Gizlilik'
);
