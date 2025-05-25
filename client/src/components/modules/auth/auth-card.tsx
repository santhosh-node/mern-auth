import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footerHref?: string;
  footerHrefLabel?: string;
  footerHrefDescription?: string;
}

export function AuthCard({ title, description, children, footerHref, footerHrefLabel, footerHrefDescription }: AuthCardProps) {
  return (
    <Card className="w-full max-w-sm animate-fade-left shadow-none">
      <CardHeader className="gap-0">
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footerHref && footerHrefLabel && (
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          {footerHrefDescription && <span>{footerHrefDescription} </span>}
          <Link href={footerHref} className="ml-1 font-medium text-primary hover:underline">
            {footerHrefLabel}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
