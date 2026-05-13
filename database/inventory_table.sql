-- ============================================================
-- PharmaCare – Inventory Transactions Seed Data
-- ============================================================
-- Run AFTER schema.sql and medicines_table.sql

-- Note: medicine_id values must match UUIDs from your actual medicines table
-- These are example inserts; replace the medicine_id values after seeding medicines

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
