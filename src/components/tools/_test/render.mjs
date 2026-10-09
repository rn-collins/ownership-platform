// Test helper for the tools: loads React and the kit's React wrappers. React comes from the repo's own node_modules (React 18.3).
// Written for this repository; the kit has a fuller version that also drives the static (HTW) renderers.
export const HAVE_REACT = true;

export async function reactKit() {
  const React = (await import('react')).default;
  const server = await import('react-dom/server');
  const kit = await import('../_kit/react/index.mjs');
  return { React, server, kit, version: React.version };
}
