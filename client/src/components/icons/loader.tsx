import React from 'react';

export default function IconLoader({ size = 80, className = '', ...props }) {
  return (
    <svg
      className={`stroke-blue-dark text-blue-500 ${className}`}
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <circle cx="12" cy="3" fill="currentColor" r="1" strokeWidth="0.2">
          <animate
            attributeName="r"
            begin="0;svgSpinners12DotsScaleRotate2.end-0.5s"
            calcMode="spline"
            dur="0.6s"
            id="svgSpinners12DotsScaleRotate0"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="16.5" cy="4.21" fill="currentColor" r="1" strokeWidth="0.2">
          <animate
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate0.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            id="svgSpinners12DotsScaleRotate1"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="7.5" cy="4.21" fill="currentColor" r="1" strokeWidth="0.2">
          <animate
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate4.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            id="svgSpinners12DotsScaleRotate2"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="19.79" cy="7.5" fill="currentColor" r="1" strokeWidth="0.2">
          <animate
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate1.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            id="svgSpinners12DotsScaleRotate3"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="4.21" cy="7.5" fill="currentColor" r="1" strokeWidth="0.2">
          <animate
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate6.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            id="svgSpinners12DotsScaleRotate4"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="21" cy="12" fill="currentColor" r="1" strokeWidth="0.2">
          <animate
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate3.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            id="svgSpinners12DotsScaleRotate5"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="3" cy="12" fill="currentColor" r="1" strokeWidth="0.2">
          <animate
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate8.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            id="svgSpinners12DotsScaleRotate6"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle
          cx="19.79"
          cy="16.5"
          fill="currentColor"
          r="1"
          strokeWidth="0.2"
        >
          <animate
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate5.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            id="svgSpinners12DotsScaleRotate7"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="4.21" cy="16.5" fill="currentColor" r="1" strokeWidth="0.2">
          <animate
            attributeName="r"
            begin="svgSpinners12DotsScaleRotatea.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            id="svgSpinners12DotsScaleRotate8"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle
          cx="16.5"
          cy="19.79"
          fill="currentColor"
          r="1"
          strokeWidth="0.2"
        >
          <animate
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate7.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            id="svgSpinners12DotsScaleRotate9"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="7.5" cy="19.79" fill="currentColor" r="1" strokeWidth="0.2">
          <animate
            attributeName="r"
            begin="svgSpinners12DotsScaleRotateb.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            id="svgSpinners12DotsScaleRotatea"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <circle cx="12" cy="21" fill="currentColor" r="1" strokeWidth="0.2">
          <animate
            attributeName="r"
            begin="svgSpinners12DotsScaleRotate9.begin+0.1s"
            calcMode="spline"
            dur="0.6s"
            id="svgSpinners12DotsScaleRotateb"
            keySplines=".27,.42,.37,.99;.53,0,.61,.73"
            values="1;2;1"
          />
        </circle>
        <animateTransform
          attributeName="transform"
          dur="8s"
          repeatCount="indefinite"
          type="rotate"
          values="360 12 12;0 12 12"
        />
      </g>
    </svg>
  );
}
