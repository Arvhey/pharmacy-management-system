-- ============================================================
-- PharmaCare – Complete Schema with Data
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS table (mirrors Supabase auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  id          UUID         PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT         NOT NULL UNIQUE,
  full_name   TEXT,
  role        TEXT         NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  phone       TEXT,
  address     TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ============================================================
-- MEDICINES table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.medicines (
  id               UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT          NOT NULL,
  generic_name     TEXT,
  category         TEXT,
  stock_quantity   INTEGER       NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  unit             TEXT          NOT NULL DEFAULT 'tablet',
  unit_price       NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (unit_price >= 0),
  selling_price    NUMERIC(10,2) DEFAULT 0,
  manufacturer     TEXT,
  supplier         TEXT,
  batch_number     TEXT,
  expiry_date      DATE,
  description      TEXT,
  reorder_level    INTEGER       DEFAULT 10,
  created_by       UUID          REFERENCES public.users(id),
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INVENTORY TRANSACTIONS table
-- ============================================================
CREATE TABLE IF NOT EXISTS public.inventory_transactions (
  id           UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  medicine_id  UUID          NOT NULL REFERENCES public.medicines(id) ON DELETE CASCADE,
  type         TEXT          NOT NULL CHECK (type IN ('in', 'out', 'adjustment')),
  quantity     INTEGER       NOT NULL CHECK (quantity > 0),
  notes        TEXT,
  performed_by UUID          REFERENCES public.users(id),
  created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_medicines_category ON public.medicines(category);
CREATE INDEX IF NOT EXISTS idx_medicines_expiry   ON public.medicines(expiry_date);
CREATE INDEX IF NOT EXISTS idx_medicines_stock    ON public.medicines(stock_quantity);
CREATE INDEX IF NOT EXISTS idx_inv_txn_medicine   ON public.inventory_transactions(medicine_id);
CREATE INDEX IF NOT EXISTS idx_inv_txn_type       ON public.inventory_transactions(type);
CREATE INDEX IF NOT EXISTS idx_inv_txn_date       ON public.inventory_transactions(created_at);

-- ============================================================
-- Auto-update updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_medicines_updated_at
  BEFORE UPDATE ON public.medicines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Row Level Security Policies
-- ============================================================

-- Enable RLS
ALTER TABLE public.users                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_transactions ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON public.users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- Medicines table policies
CREATE POLICY "Authenticated users can view medicines"
  ON public.medicines FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert medicines"
  ON public.medicines FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update medicines"
  ON public.medicines FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can delete medicines"
  ON public.medicines FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

-- Inventory transactions policies
CREATE POLICY "Authenticated users can view transactions"
  ON public.inventory_transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert transactions"
  ON public.inventory_transactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ============================================================
-- Seed Data - Medicines
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

-- ============================================================
-- Seed Data - Inventory Transactions
-- ============================================================
INSERT INTO public.inventory_transactions (medicine_id, type, quantity, notes)
SELECT id, 'in', 100, 'Initial stock load'
FROM public.medicines
WHERE name = 'Paracetamol 500mg';

INSERT INTO public.inventory_transactions (medicine_id, type, quantity, notes)
SELECT id, 'out', 20, 'Dispensed to patient'
FROM public.medicines
WHERE name = 'Amoxicillin 500mg';

INSERT INTO public.inventory_transactions (medicine_id, type, quantity, notes)
SELECT id, 'out', 10, 'Dispensed to patient'
FROM public.medicines
WHERE name = 'Losartan 50mg';

INSERT INTO public.inventory_transactions (medicine_id, type, quantity, notes)
SELECT id, 'in', 50, 'New delivery'
FROM public.medicines
WHERE name = 'Omeprazole 20mg';

INSERT INTO public.inventory_transactions (medicine_id, type, quantity, notes)
SELECT id, 'out', 30, 'Dispensed to patient'
FROM public.medicines
WHERE name = 'Vitamin C 500mg';

-- ============================================================
-- Reports Helper Views
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
