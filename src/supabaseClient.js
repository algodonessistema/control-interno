// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://yeybjxyamafnnuzetudd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleWJqeHlhbWFmbm51emV0dWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MjcwMTYsImV4cCI6MjA2ODEwMzAxNn0.T9-q0khsFCK0fqoMFtTQoTvLLE-38NE6Y7HAGYK3UuE'; // Usa la PUBLIC KEY, nunca la secreta en frontend

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);