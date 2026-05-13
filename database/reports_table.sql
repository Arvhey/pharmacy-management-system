-- ============================================================
-- PharmaCare – Reports Helper Views
-- ============================================================

-- Monthly sales summary view
CREATE OR REPLACE VIEW public.v_monthly_sales AS
SELECT
  DATE_TRUNC('month', t.created_at) AS month,
  m.category,
  m.name AS medicine_name,
  SUM(t.quantity)                   AS total_quantity,
  SUM(t.quantity * m.unit_price)    AS total_value
FROM public.inventory_transactions t
JOIN public.medicines m ON t.medicine_id = m.id
WHERE t.type = 'out'
GROUP BY DATE_TRUNC('month', t.created_at), m.category, m.name
ORDER BY month DESC;

-- Inventory summary view
CREATE OR REPLACE VIEW public.v_inventory_summary AS
SELECT
  category,
  COUNT(*)                                  AS product_count,
  SUM(stock_quantity)                       AS total_stock,
  SUM(stock_quantity * unit_price)          AS total_value,
  COUNT(*) FILTER (WHERE stock_quantity = 0)         AS out_of_stock,
  COUNT(*) FILTER (WHERE stock_quantity <= 10 AND stock_quantity > 0) AS low_stock,
  COUNT(*) FILTER (WHERE expiry_date <= CURRENT_DATE + INTERVAL '30 days'
                     AND expiry_date >= CURRENT_DATE)                  AS expiring_soon
FROM public.medicines
GROUP BY category
ORDER BY category;

-- Expiry alert view
CREATE OR REPLACE VIEW public.v_expiry_alerts AS
SELECT
  id, name, generic_name, category, stock_quantity, unit,
  expiry_date,
  (expiry_date - CURRENT_DATE) AS days_until_expiry,
  CASE
    WHEN expiry_date < CURRENT_DATE                    THEN 'Expired'
    WHEN expiry_date <= CURRENT_DATE + INTERVAL '30 days' THEN 'Expiring Soon'
    ELSE 'OK'
  END AS expiry_status
FROM public.medicines
WHERE expiry_date <= CURRENT_DATE + INTERVAL '90 days'
ORDER BY expiry_date ASC;
