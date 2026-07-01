import { onCLS, onINP, onLCP, type Metric } from 'web-vitals';

function track(metric: Metric): void {
  // Replace with analytics endpoint when available.
  if (import.meta.env.DEV) {
    console.info('[web-vitals]', metric.name, Math.round(metric.value), metric.rating);
  }
}

export function initWebVitals(): void {
  onCLS(track);
  onINP(track);
  onLCP(track);
}
