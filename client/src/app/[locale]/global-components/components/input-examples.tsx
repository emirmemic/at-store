'use client';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

export default function InputExamples() {
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(true);
  const [checkedThree, setCheckedThree] =
    useState<CheckboxPrimitive.CheckedState>(false);
  const [checkedFour, setCheckedFour] =
    useState<CheckboxPrimitive.CheckedState>(true);
  const t = useTranslations('login');
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <>
      <div className="h-[2px] w-full bg-grey"></div>
      <h4 className="display">Input Fields</h4>
      <div className="h-[2px] w-full bg-grey"></div>

      <div className="flex max-w-md flex-col gap-4">
        <div className="max-w-48">
          <Input
            required
            autoComplete="name"
            id="name"
            name="name"
            placeholder="Name"
            type="text"
          />
        </div>
        <Input
          disabled
          required
          autoComplete="email"
          id="email"
          name="email"
          placeholder="Email disabled"
          type="email"
        />
        <Input
          required
          autoComplete="password"
          id="password"
          name="password"
          placeholder="*********"
          type="password"
        />
        <Input
          required
          autoComplete="email"
          id="email"
          name="email"
          placeholder="File"
          type="file"
        />
        <Textarea
          required
          id="message"
          name="message"
          placeholder="Please enter your message here"
        />
        <Textarea
          disabled
          required
          id="message-disabled"
          name="message-disabled"
          placeholder="Please enter your message here (disabled)"
        />
        <div className="flex gap-4">
          <Switch aria-checked={checkedOne} onCheckedChange={setCheckedOne} />
          <Switch checked={checkedTwo} onCheckedChange={setCheckedTwo} />
          <Switch
            disabled
            checked={checkedOne}
            onCheckedChange={setCheckedOne}
          />
          <Checkbox checked={checkedThree} onCheckedChange={setCheckedThree} />
          <Checkbox checked={checkedFour} onCheckedChange={setCheckedFour} />
        </div>
        <Button
          size={'xlg'}
          variant={'filled'}
          onClick={() => setAlertVisible(!alertVisible)}
        >
          Toggle alert visibility from parent
        </Button>
        <Alert
          dismissible
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
        >
          <AlertDescription>
            Default alert message with dismiss button
          </AlertDescription>
        </Alert>
        <Alert dismissible variant="destructive">
          <AlertDescription>{t('errorWrongInfo')}</AlertDescription>
        </Alert>
        <Alert dismissible>
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>
            Default alert message with dismiss button and title
          </AlertDescription>
        </Alert>
        <Alert>
          <AlertDescription>
            Another alert message without dismiss button
          </AlertDescription>
        </Alert>
        <Alert dismissible variant="success">
          <AlertDescription>
            Success alert message with dismiss button
          </AlertDescription>
        </Alert>
        <Alert dismissible variant="warning">
          <AlertDescription>Warning alert message</AlertDescription>
        </Alert>
      </div>
    </>
  );
}
