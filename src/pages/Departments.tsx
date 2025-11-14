import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Truck, Car as CarIcon } from 'lucide-react';

const Departments = () => {
  const { t } = useTranslation();

  const departments = [
    {
      id: 1,
      name: t('department.heavy'),
      icon: Truck,
      sections: 3,
      employees: 12,
    },
    {
      id: 2,
      name: t('department.sedan'),
      icon: CarIcon,
      sections: 4,
      employees: 18,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{t('department.title')}</h1>
          <Button className="bg-primary hover:bg-primary/90 shadow-elegant">
            <Plus className="mr-2 h-4 w-4" />
            {t('department.add')}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {departments.map((dept) => (
            <Card key={dept.id} className="shadow-elegant hover:shadow-glow transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <dept.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{dept.name}</CardTitle>
                    <CardDescription>{t('department.main')}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('department.section')}</p>
                    <p className="text-2xl font-bold text-primary">{dept.sections}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('employee.title')}</p>
                    <p className="text-2xl font-bold text-primary">{dept.employees}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Departments;
