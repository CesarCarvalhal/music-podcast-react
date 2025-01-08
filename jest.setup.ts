import { TextEncoder, TextDecoder } from 'text-encoding';
import '@testing-library/jest-dom';

declare global {
  interface Window {
    TextEncoder: typeof TextEncoder;
    TextDecoder: typeof TextDecoder;
  }
}

window.TextEncoder = TextEncoder;
window.TextDecoder = TextDecoder;
