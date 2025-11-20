import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://nyldlmifvsecvvrpfxiv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55bGRsbWlmdnNlY3Z2cnBmeGl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NjkxODEsImV4cCI6MjA3OTE0NTE4MX0.OvSucpQhROxKlQMO-om8dVtaKmai5dc7Y2dGq2rNCU8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
