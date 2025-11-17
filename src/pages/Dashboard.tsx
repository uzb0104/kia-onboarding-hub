import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, UserPlus, Clock, CheckCircle2, Building2, Activity, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t('dashboard.totalEmployees'),
      value: '2',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: t('dashboard.newEmployees'),
      value: '1',
      icon: UserPlus,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: t('dashboard.onProbation'),
      value: '1',
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: t('dashboard.completed'),
      value: '1',
      icon: CheckCircle2,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
  ];

  const departments = [
    {
      name: 'jknklm..',
      sections: 1,
      icon: 'jk',
    },
    {
      name: 'kmok',
      sections: 0,
      icon: 'km',
    },
  ];

  const recentActivity = [
    {
      name: 'knoikl mkni;ukj',
      status: 'yangi',
      initials: 'km',
    },
    {
      name: 'mnjkm klnukm',
      status: 'yakunlangan',
      initials: 'mk',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'yangi':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'yakunlangan':
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground text-lg">
            {t('dashboard.welcome')}, Abbosjon Omonov
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-elegant hover:shadow-glow transition-all">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-destructive" />
                {t('dashboard.departments')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-destructive-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold">{dept.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {dept.sections} {t('dashboard.section')}
                        </p>
                      </div>
                    </div>
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-destructive" />
                {t('dashboard.recentActivity')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 bg-muted">
                        <AvatarFallback className="text-sm font-medium">
                          {activity.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{activity.name}</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {activity.status}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={getStatusColor(activity.status)}>
                      {activity.status === 'yangi' ? t('dashboard.new') : t('dashboard.completed')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
