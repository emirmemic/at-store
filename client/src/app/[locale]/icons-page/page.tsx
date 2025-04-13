import React from 'react';

import * as Icons from '@/components/icons';

const IconsPage = () => {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Icons Preview</h1>
      <div className="flex flex-wrap gap-8">
        {Object.entries(Icons).map(([name, IconComponent]) => {
          const Icon = IconComponent as React.ComponentType<
            React.SVGProps<SVGSVGElement>
          >;
          return (
            <div key={name} className="flex flex-col items-center">
              <Icon className="mb-2 h-8 w-8 text-blue-steel" />
              <span className="text-center text-sm">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconsPage;
