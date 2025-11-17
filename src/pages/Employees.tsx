import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserPlus, Search, Filter, Phone, Building2, Calendar, Eye } from 'lucide-react';

const Employees = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const statusFilters = [
    { key: 'all', label: t('employee.filters.all') },
    { key: 'yangi', label: t('employee.statuses.new') },
    { key: 'jarayonda', label: t('employee.statuses.training') },
    { key: 'yaxshi', label: t('employee.statuses.progressing') },
    { key: 'alo', label: t('employee.statuses.excellent') },
    { key: 'yakunlangan', label: t('employee.statuses.completed') },
  ];

  const employees = [
    {
      id: 1,
      fullName: 'mnjkm klnukm',
      initials: 'mk',
      position: 'niukjnm',
      phone: '5615618561',
      department: 'jknklm.. / .l.',
      joinDate: '16 Nov 2025',
      status: 'yakunlangan',
    },
    {
      id: 2,
      fullName: 'knoikl mkni;ukj',
      initials: 'km',
      position: 'mknikl\'',
      phone: '+99899',
      department: '',
      joinDate: '16 Nov 2025',
      status: 'yangi',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'yangi':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'jarayonda':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
      case 'yaxshi':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'alo':
        return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20';
      case 'yakunlangan':
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      yangi: t('employee.statuses.new'),
      jarayonda: t('employee.statuses.training'),
      yaxshi: t('employee.statuses.progressing'),
      alo: t('employee.statuses.excellent'),
      yakunlangan: t('employee.statuses.completed'),
    };
    return statusMap[status] || status;
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.phone.includes(searchQuery);
    const matchesStatus = selectedStatus === 'all' || emp.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{t('employee.title')}</h1>
            <p className="text-muted-foreground">{t('employee.subtitle')}</p>
          </div>
          <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-elegant">
            <UserPlus className="mr-2 h-5 w-5" />
            {t('employee.add')}
          </Button>
        </div>

        <Card className="mb-6 shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={t('employee.searchPlaceholder')}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="border-border">
                <Filter className="mr-2 h-4 w-4" />
                {t('employee.advancedFilters')}
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={selectedStatus === filter.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedStatus(filter.key)}
                  className={selectedStatus === filter.key ? 'bg-destructive hover:bg-destructive/90' : ''}
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              {t('employee.found')}: <span className="font-semibold">{filteredEmployees.length}</span> {t('employee.employee')}
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="shadow-elegant hover:shadow-glow transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14 bg-muted">
                      <AvatarFallback className="text-lg font-semibold">
                        {employee.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{employee.fullName}</h3>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{employee.phone}</span>
                  </div>
                  {employee.department && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{employee.department}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{employee.joinDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <Badge variant="secondary" className={getStatusColor(employee.status)}>
                    {getStatusLabel(employee.status)}
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    {t('employee.view')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Employees;
