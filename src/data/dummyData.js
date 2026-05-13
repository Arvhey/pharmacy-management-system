// Dummy/seed data for development & demo purposes

export const dummyMedicines = [
  {
    id: '1', name: 'Paracetamol 500mg', generic_name: 'Acetaminophen', category: 'Analgesics',
    stock_quantity: 250, unit: 'tablet', unit_price: 5.50, selling_price: 8.00,
    manufacturer: 'Unilab', supplier: 'MedSupply Co.', batch_number: 'BN2024001',
    expiry_date: '2026-12-31', description: 'Pain reliever and fever reducer', reorder_level: 50,
  },
  {
    id: '2', name: 'Amoxicillin 500mg', generic_name: 'Amoxicillin', category: 'Antibiotics',
    stock_quantity: 8, unit: 'capsule', unit_price: 15.00, selling_price: 22.00,
    manufacturer: 'GSK', supplier: 'PharmaDist', batch_number: 'BN2024002',
    expiry_date: '2025-08-15', description: 'Broad-spectrum antibiotic', reorder_level: 30,
  },
  {
    id: '3', name: 'Losartan 50mg', generic_name: 'Losartan Potassium', category: 'Antihypertensives',
    stock_quantity: 180, unit: 'tablet', unit_price: 12.00, selling_price: 18.00,
    manufacturer: 'Pfizer', supplier: 'MedSupply Co.', batch_number: 'BN2024003',
    expiry_date: '2027-03-20', description: 'ACE inhibitor for hypertension', reorder_level: 40,
  },
  {
    id: '4', name: 'Metformin 500mg', generic_name: 'Metformin HCl', category: 'Antidiabetics',
    stock_quantity: 5, unit: 'tablet', unit_price: 9.00, selling_price: 14.00,
    manufacturer: 'Merck', supplier: 'PharmaDist', batch_number: 'BN2024004',
    expiry_date: '2025-06-30', description: 'Oral diabetes medication', reorder_level: 30,
  },
  {
    id: '5', name: 'Cetirizine 10mg', generic_name: 'Cetirizine HCl', category: 'Antihistamines',
    stock_quantity: 0, unit: 'tablet', unit_price: 7.00, selling_price: 11.00,
    manufacturer: 'Unilab', supplier: 'MedSupply Co.', batch_number: 'BN2024005',
    expiry_date: '2026-09-10', description: 'Antihistamine for allergy relief', reorder_level: 20,
  },
  {
    id: '6', name: 'Omeprazole 20mg', generic_name: 'Omeprazole', category: 'Gastrointestinal',
    stock_quantity: 320, unit: 'capsule', unit_price: 18.00, selling_price: 28.00,
    manufacturer: 'AstraZeneca', supplier: 'PharmaDist', batch_number: 'BN2024006',
    expiry_date: '2027-01-15', description: 'Proton pump inhibitor for acid reflux', reorder_level: 50,
  },
  {
    id: '7', name: 'Vitamin C 500mg', generic_name: 'Ascorbic Acid', category: 'Vitamins & Minerals',
    stock_quantity: 600, unit: 'tablet', unit_price: 4.00, selling_price: 6.50,
    manufacturer: 'Unilab', supplier: 'MedSupply Co.', batch_number: 'BN2024007',
    expiry_date: '2026-06-30', description: 'Vitamin C supplement', reorder_level: 100,
  },
  {
    id: '8', name: 'Salbutamol Inhaler', generic_name: 'Salbutamol', category: 'Respiratory',
    stock_quantity: 45, unit: 'bottle', unit_price: 150.00, selling_price: 220.00,
    manufacturer: 'GSK', supplier: 'PharmaDist', batch_number: 'BN2024008',
    expiry_date: '2025-11-20', description: 'Bronchodilator for asthma', reorder_level: 10,
  },
]

export const dummyTransactions = [
  { id: 't1', medicine_id: '1', type: 'in',  quantity: 100, notes: 'Regular restock',    created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 't2', medicine_id: '2', type: 'out', quantity: 20,  notes: 'Dispensed to patient', created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: 't3', medicine_id: '3', type: 'out', quantity: 10,  notes: 'Dispensed',           created_at: new Date(Date.now() - 3600000 * 5).toISOString() },
  { id: 't4', medicine_id: '6', type: 'in',  quantity: 50,  notes: 'New delivery',        created_at: new Date(Date.now() - 3600000).toISOString() },
  { id: 't5', medicine_id: '7', type: 'out', quantity: 30,  notes: 'Dispensed',           created_at: new Date().toISOString() },
]

export const dummyUsers = [
  { id: 'u1', email: 'admin@pharmacare.com', full_name: 'Admin User',    role: 'admin', created_at: '2024-01-01' },
  { id: 'u2', email: 'staff@pharmacare.com', full_name: 'Staff Member',  role: 'staff', created_at: '2024-02-15' },
]

export const dummySalesData = {
  labels:   ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    { label: 'Sales (₱)', data: [12400, 15200, 11800, 18600, 14200, 21500], borderColor: '#14b8a6', backgroundColor: 'rgba(20,184,166,0.1)' },
  ],
}

export const dummyCategoryData = {
  labels: ['Analgesics', 'Antibiotics', 'Antidiabetics', 'Vitamins', 'Respiratory', 'Other'],
  data:   [30, 15, 12, 25, 8, 10],
}

export const recentActivities = [
  { id: 1, type: 'stock_in',  message: 'Paracetamol 500mg — 100 units added',        time: '2 hours ago', icon: 'arrow-down-circle' },
  { id: 2, type: 'stock_out', message: 'Amoxicillin 500mg — 20 units dispensed',     time: '4 hours ago', icon: 'arrow-up-circle'   },
  { id: 3, type: 'alert',     message: 'Cetirizine 10mg — Out of stock!',            time: '5 hours ago', icon: 'alert-triangle'    },
  { id: 4, type: 'alert',     message: 'Metformin 500mg — Low stock (5 remaining)', time: '6 hours ago', icon: 'alert-triangle'    },
  { id: 5, type: 'stock_in',  message: 'Omeprazole 20mg — 50 units added',           time: '1 day ago',  icon: 'arrow-down-circle' },
]
