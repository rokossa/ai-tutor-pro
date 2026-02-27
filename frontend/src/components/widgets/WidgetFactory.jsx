import React, { lazy, Suspense } from 'react';

const MathWidget = lazy(() => import('./MathWidget'));
const CodeWidget = lazy(() => import('./CodeWidget'));
const EssayWidget = lazy(() => import('./EssayWidget'));
const MultipleChoiceWidget = lazy(() => import('./MultipleChoiceWidget'));

export default function WidgetFactory({ exerciseType, questionData, onAnswerSubmit }) {
  // Implementation mapped in Phase 5
  return <div>Widget Placeholder</div>;
}
