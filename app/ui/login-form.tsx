'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { doSocialLogin } from '../lib/actions';

export default function LoginForm() {
  return (
    <form className="space-y-3" action={doSocialLogin}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">       
        <Button className="mt-4 w-full" name="action" value="google">
          Log in with Google <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </div>
    </form>
  );
}
