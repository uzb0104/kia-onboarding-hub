import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format, addMonths } from 'date-fns';
import { CalendarIcon, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const employeeFormSchema = z.object({
  firstName: z.string().min(1, 'Ism majburiy'),
  lastName: z.string().min(1, 'Familiya majburiy'),
  middleName: z.string().optional(),
  birthDate: z.date({ required_error: 'Tug\'ilgan sana majburiy' }),
  phone: z.string().min(1, 'Telefon raqami majburiy'),
  address: z.string().optional(),
  department: z.string().min(1, 'Bo\'lim majburiy'),
  section: z.string().optional(),
  startDate: z.date({ required_error: 'Ish boshlangan sana majburiy' }),
  status: z.string().default('yangi'),
  experience: z.number().min(0).default(0),
  degree: z.string().optional(),
  technicalSkills: z.number().min(0).max(10).default(5),
  softSkills: z.number().min(0).max(10).default(5),
  teamwork: z.number().min(0).max(10).default(5),
  communication: z.number().min(0).max(10).default(5),
});

type EmployeeFormData = z.infer<typeof employeeFormSchema>;

interface AddEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddEmployeeDialog = ({ open, onOpenChange }: AddEmployeeDialogProps) => {
  const { t } = useTranslation();
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      status: 'yangi',
      experience: 0,
      technicalSkills: 5,
      softSkills: 5,
      teamwork: 5,
      communication: 5,
    },
  });

  const startDate = form.watch('startDate');
  const probationEndDate = startDate ? addMonths(startDate, 3) : null;

  const onSubmit = (data: EmployeeFormData) => {
    console.log('Form data:', data);
    console.log('Profile image:', profileImage);
    // TODO: Submit to database
    onOpenChange(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <DialogTitle className="text-2xl">{t('employee.addTitle')}</DialogTitle>
              <p className="text-sm text-muted-foreground">{t('employee.addSubtitle')}</p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-4">
          {/* Shaxsiy ma'lumotlar */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('employee.personalInfo')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  {t('employee.firstName')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  {...form.register('firstName')}
                  className={form.formState.errors.firstName ? 'border-destructive' : ''}
                />
                {form.formState.errors.firstName && (
                  <p className="text-sm text-destructive">{form.formState.errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  {t('employee.lastName')} <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  {...form.register('lastName')}
                  className={form.formState.errors.lastName ? 'border-destructive' : ''}
                />
                {form.formState.errors.lastName && (
                  <p className="text-sm text-destructive">{form.formState.errors.lastName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName">{t('employee.otherName')}</Label>
                <Input id="middleName" {...form.register('middleName')} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t('employee.birthDate')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !form.watch('birthDate') && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.watch('birthDate') ? (
                        format(form.watch('birthDate'), 'PPP')
                      ) : (
                        <span>mm/dd/yyyy</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.watch('birthDate')}
                      onSelect={(date) => form.setValue('birthDate', date as Date)}
                      disabled={(date) => date > new Date() || date < new Date('1950-01-01')}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t('employee.phone')}</Label>
                <Input
                  id="phone"
                  {...form.register('phone')}
                  placeholder="+998 90 123 45 67"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{t('employee.address')}</Label>
              <Input id="address" {...form.register('address')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileImage">{t('employee.profilePicture')}</Label>
              <Input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Ish ma'lumotlari */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('employee.workInfo')}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">
                  {t('employee.department')} <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.watch('department')}
                  onValueChange={(value) => form.setValue('department', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('employee.selectDepartment')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dept1">Bo'lim 1</SelectItem>
                    <SelectItem value="dept2">Bo'lim 2</SelectItem>
                    <SelectItem value="dept3">Bo'lim 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="section">{t('employee.section')}</Label>
                <Select
                  value={form.watch('section')}
                  onValueChange={(value) => form.setValue('section', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('employee.selectSection')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="section1">Bo'limcha 1</SelectItem>
                    <SelectItem value="section2">Bo'limcha 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t('employee.startDate')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !form.watch('startDate') && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.watch('startDate') ? (
                        format(form.watch('startDate'), 'MM/dd/yyyy')
                      ) : (
                        <span>11/17/2025</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.watch('startDate')}
                      onSelect={(date) => form.setValue('startDate', date as Date)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>{t('employee.probationEnd')}</Label>
                <Input
                  value={probationEndDate ? format(probationEndDate, 'MM/dd/yyyy') : ''}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">{t('employee.status')}</Label>
                <Select
                  value={form.watch('status')}
                  onValueChange={(value) => form.setValue('status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yangi">{t('employee.statuses.new')}</SelectItem>
                    <SelectItem value="jarayonda">{t('employee.statuses.training')}</SelectItem>
                    <SelectItem value="yaxshi">{t('employee.statuses.progressing')}</SelectItem>
                    <SelectItem value="alo">{t('employee.statuses.excellent')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">{t('employee.experience')}</Label>
                <Input
                  id="experience"
                  type="number"
                  min="0"
                  {...form.register('experience', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="degree">{t('employee.degree')}</Label>
                <Input
                  id="degree"
                  {...form.register('degree')}
                  placeholder={t('employee.degreePlaceholder')}
                />
              </div>
            </div>
          </div>

          {/* Ko'nikmalar */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('employee.skills')}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>{t('employee.technicalSkills')}</Label>
                  <span className="text-destructive font-semibold">
                    {form.watch('technicalSkills')}/10
                  </span>
                </div>
                <Slider
                  value={[form.watch('technicalSkills')]}
                  onValueChange={(value) => form.setValue('technicalSkills', value[0])}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>{t('employee.softSkills')}</Label>
                  <span className="text-destructive font-semibold">
                    {form.watch('softSkills')}/10
                  </span>
                </div>
                <Slider
                  value={[form.watch('softSkills')]}
                  onValueChange={(value) => form.setValue('softSkills', value[0])}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>{t('employee.teamwork')}</Label>
                  <span className="text-destructive font-semibold">
                    {form.watch('teamwork')}/10
                  </span>
                </div>
                <Slider
                  value={[form.watch('teamwork')]}
                  onValueChange={(value) => form.setValue('teamwork', value[0])}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>{t('employee.communication')}</Label>
                  <span className="text-destructive font-semibold">
                    {form.watch('communication')}/10
                  </span>
                </div>
                <Slider
                  value={[form.watch('communication')]}
                  onValueChange={(value) => form.setValue('communication', value[0])}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              {t('employee.add')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
