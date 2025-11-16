import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.81.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TestAdmin {
  email: string;
  password: string;
  role: 'hr_admin' | 'master_admin' | 'status_admin';
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const testAdmins: TestAdmin[] = [
      { email: 'hradmin@test.uz', password: 'hradmin123', role: 'hr_admin' },
      { email: 'master@test.uz', password: 'master123', role: 'master_admin' },
      { email: 'statusadmin@test.uz', password: 'status123', role: 'status_admin' },
    ];

    const results = [];

    for (const admin of testAdmins) {
      console.log(`Creating user: ${admin.email}`);
      
      // Create user with admin client
      const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
        email: admin.email,
        password: admin.password,
        email_confirm: true,
      });

      if (userError) {
        console.error(`Error creating user ${admin.email}:`, userError);
        results.push({
          email: admin.email,
          success: false,
          error: userError.message,
        });
        continue;
      }

      console.log(`User created: ${admin.email}, ID: ${userData.user.id}`);

      // Insert role into user_roles table
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: userData.user.id,
          role: admin.role,
        });

      if (roleError) {
        console.error(`Error assigning role to ${admin.email}:`, roleError);
        results.push({
          email: admin.email,
          userId: userData.user.id,
          success: false,
          error: `User created but role assignment failed: ${roleError.message}`,
        });
        continue;
      }

      console.log(`Role ${admin.role} assigned to ${admin.email}`);
      
      results.push({
        email: admin.email,
        userId: userData.user.id,
        role: admin.role,
        success: true,
      });
    }

    return new Response(
      JSON.stringify({
        message: 'Test admin creation process completed',
        results,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in create-test-admins function:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
