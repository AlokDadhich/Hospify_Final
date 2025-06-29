import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vtcycnnfyxlausxylxtq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Y3ljbm5meXhsYXVzeHlseHRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExODAzNDAsImV4cCI6MjA2Njc1NjM0MH0.y88jQ-C2Y0TJaLK2iV57xk9ESiOhanwB1EW0bzQkGfg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;