import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fovovrngawjoknwmlpna.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvdm92cm5nYXdqb2tud21scG5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyOTE1NDYsImV4cCI6MjA1NTg2NzU0Nn0.UHs7uDyK54mdxjy7B9NOS6jNLjohZdDCDOQc547WTKo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
