import { MessageSquareIcon } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-1.5 font-medium">
      <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <MessageSquareIcon className="size-4" />
      </div>
      <span className="text-lg font-bold">WhatsApp</span>
    </div>
  );
}
