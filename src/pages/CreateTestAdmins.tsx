import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, UserPlus } from 'lucide-react';

const CreateTestAdmins = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateAdmins = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-test-admins');

      if (error) throw error;

      console.log('Test admins creation result:', data);

      const successCount = data.results.filter((r: any) => r.success).length;
      const failCount = data.results.length - successCount;

      toast({
        title: 'Natija',
        description: `${successCount} ta foydalanuvchi muvaffaqiyatli yaratildi${failCount > 0 ? `, ${failCount} ta xato` : ''}`,
      });

      if (successCount > 0) {
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error creating test admins:', error);
      toast({
        variant: 'destructive',
        title: 'Xato',
        description: error.message || 'Test foydalanuvchilarni yaratishda xato',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-6 w-6" />
              Test Adminlarni Yaratish
            </CardTitle>
            <CardDescription>
              Quyidagi test foydalanuvchilar avtomatik yaratiladi:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">HR Admin</h3>
                <p className="text-sm text-muted-foreground">Email: hradmin@test.uz</p>
                <p className="text-sm text-muted-foreground">Parol: hradmin123</p>
                <p className="text-sm text-muted-foreground">Rol: hr_admin</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Master Admin</h3>
                <p className="text-sm text-muted-foreground">Email: master@test.uz</p>
                <p className="text-sm text-muted-foreground">Parol: master123</p>
                <p className="text-sm text-muted-foreground">Rol: master_admin</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Status Admin</h3>
                <p className="text-sm text-muted-foreground">Email: statusadmin@test.uz</p>
                <p className="text-sm text-muted-foreground">Parol: status123</p>
                <p className="text-sm text-muted-foreground">Rol: status_admin</p>
              </div>
            </div>

            <Button
              onClick={handleCreateAdmins}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Yaratilmoqda...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Test Adminlarni Yaratish
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTestAdmins;
