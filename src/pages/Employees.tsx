import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Filter } from 'lucide-react';

const Employees = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{t('employee.title')}</h1>
          <Button className="bg-primary hover:bg-primary/90 shadow-elegant">
            <Plus className="mr-2 h-4 w-4" />
            {t('employee.add')}
          </Button>
        </div>

        <Card className="mb-6 shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={t('common.search')}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="border-border">
                <Filter className="mr-2 h-4 w-4" />
                {t('common.filter')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="shadow-elegant hover:shadow-glow transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">
                {t('employee.title')} - {t('common.loading')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Employee list will be populated from the database
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Employees;
