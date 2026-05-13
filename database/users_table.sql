-- ============================================================
-- PharmaCare – Row Level Security Policies
-- ============================================================

-- Enable RLS
ALTER TABLE public.users                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_transactions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Users table policies
-- ============================================================
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

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

-- ============================================================
-- Medicines table policies
-- ============================================================
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

-- ============================================================
-- Inventory transactions policies
-- ============================================================
CREATE POLICY "Authenticated users can view transactions"
  ON public.inventory_transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert transactions"
  ON public.inventory_transactions FOR INSERT
  TO authenticated
  WITH CHECK (true);
