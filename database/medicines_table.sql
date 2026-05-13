-- ============================================================
-- PharmaCare – Medicines Seed Data
-- ============================================================
INSERT INTO public.medicines
  (name, generic_name, category, stock_quantity, unit, unit_price, selling_price, manufacturer, supplier, batch_number, expiry_date, description, reorder_level)
VALUES
  ('Paracetamol 500mg',   'Acetaminophen',       'Analgesics',         250, 'tablet',  5.50,  8.00,  'Unilab',      'MedSupply Co.', 'BN2024001', '2026-12-31', 'Pain reliever and fever reducer', 50),
  ('Amoxicillin 500mg',   'Amoxicillin',         'Antibiotics',          8, 'capsule', 15.00, 22.00, 'GSK',         'PharmaDist',    'BN2024002', '2025-08-15', 'Broad-spectrum antibiotic', 30),
  ('Losartan 50mg',       'Losartan Potassium',  'Antihypertensives',  180, 'tablet',  12.00, 18.00, 'Pfizer',      'MedSupply Co.', 'BN2024003', '2027-03-20', 'ACE inhibitor for hypertension', 40),
  ('Metformin 500mg',     'Metformin HCl',       'Antidiabetics',        5, 'tablet',   9.00, 14.00, 'Merck',       'PharmaDist',    'BN2024004', '2025-06-30', 'Oral diabetes medication', 30),
  ('Cetirizine 10mg',     'Cetirizine HCl',      'Antihistamines',       0, 'tablet',   7.00, 11.00, 'Unilab',      'MedSupply Co.', 'BN2024005', '2026-09-10', 'Antihistamine for allergy relief', 20),
  ('Omeprazole 20mg',     'Omeprazole',          'Gastrointestinal',   320, 'capsule', 18.00, 28.00, 'AstraZeneca', 'PharmaDist',    'BN2024006', '2027-01-15', 'Proton pump inhibitor for acid reflux', 50),
  ('Vitamin C 500mg',     'Ascorbic Acid',       'Vitamins & Minerals',600, 'tablet',   4.00,  6.50, 'Unilab',      'MedSupply Co.', 'BN2024007', '2026-06-30', 'Vitamin C supplement', 100),
  ('Salbutamol Inhaler',  'Salbutamol',          'Respiratory',         45, 'bottle', 150.00,220.00, 'GSK',         'PharmaDist',    'BN2024008', '2025-11-20', 'Bronchodilator for asthma', 10);
