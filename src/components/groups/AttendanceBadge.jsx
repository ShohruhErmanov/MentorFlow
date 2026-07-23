import Badge from '../ui/Badge';

export default function AttendanceBadge({ value }) {
  let variant = 'success';
  if (value >= 95) variant = 'success';
  else if (value >= 85) variant = 'primary';
  else if (value >= 70) variant = 'warning';
  else variant = 'danger';

  return (
    <Badge variant={variant}>
      {value}%
    </Badge>
  );
}
