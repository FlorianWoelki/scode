import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  optimizeDeps: {
    exclude: ['dexie'],
  },
  plugins: [vue(), svgLoader(), monacoEditorPlugin()],
});
