/* eslint-disable no-console */
'use client';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CounterInput } from '@/components/ui/counter-input';
import { Input } from '@/components/ui/input';
import { InputFileUpload } from '@/components/ui/input-file';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
  const handleFileChange = (files: File[] | null) => {
    if (files) {
      console.log('Selected files:', files);
    } else {
      console.log('No files selected');
    }
  };
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
          autoComplete="email"
          errorMessage="Invalid email address"
          id="email-with-error"
          name="email-with-error"
          placeholder="Email with error"
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
        <p>
          File input with multiple file uploads and a specified file type
          (accepts .svg and .png):
        </p>
        <InputFileUpload
          multiple
          accept=".svg,.png"
          name="file-upload"
          onFileChange={handleFileChange}
        />

        <p>File input with an error message:</p>
        <InputFileUpload
          errorMessage="Molimo dodajte datoteku"
          name="file-upload-2"
          onFileChange={handleFileChange}
        />
        <Textarea
          required
          id="message"
          name="message"
          placeholder="Please enter your message here"
        />
        <Textarea
          required
          errorMessage="Please enter a valid message"
          id="message-with-error"
          name="message"
          placeholder="Textarea with error"
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
        </div>
        <p className="border-b heading-4">Checkbox Examples</p>
        <div className="flex flex-col gap-2">
          <Checkbox checked={checkedThree} onCheckedChange={setCheckedThree} />
          <p>Checkbox with a label:</p>
          <Checkbox
            checked={checkedFour}
            labelClassName="flex items-center gap-2 paragraph-2"
            onCheckedChange={setCheckedFour}
          >
            <span>I agree to terms and conditions</span>
          </Checkbox>
          <p>Checkbox with an error and label:</p>
          <Checkbox
            errorMessage="Please agree to terms and conditions!"
            labelClassName="flex items-center gap-2 paragraph-2"
          >
            <span>I agree to terms and conditions</span>
          </Checkbox>
        </div>
        <p className="border-b heading-4">Radio Group Example</p>
        <div className="flex flex-col">
          <RadioGroup
            defaultValue="comfortable"
            errorMessage="Please select an option"
          >
            <RadioGroupItem id="r1" value="default">
              <span>Default</span>
            </RadioGroupItem>
            <RadioGroupItem id="r2" value="comfortable">
              <span>Comfortable</span>
            </RadioGroupItem>
            <RadioGroupItem id="r3" value="compact">
              <span>Compact</span>
            </RadioGroupItem>
          </RadioGroup>
        </div>
        <CounterInput max={10} min={1} />
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
