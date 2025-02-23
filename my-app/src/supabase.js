import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qqaxsmvxppajukcbfjts.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxYXhzbXZ4cHBhanVrY2JmanRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDc5MTEsImV4cCI6MjA1NTg4MzkxMX0.TtYoCIF_pcsiv4cSMO8_2Q5p58EcbHn0i9kBG4vG2zc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
