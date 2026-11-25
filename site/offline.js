if ('serviceWorker' in navigator) {
  const status = document.getElementById('offline-status');
  navigator.serviceWorker.register('/sw.js').then(async registration => {
    await navigator.serviceWorker.ready;
    const cache = await caches.open('field-guides-v1');
    const paths = ['/', '/camera-cards/', '/pickup-cards/', '/field-notes/', '/offline.js'];
    const ready = (await Promise.all(paths.map(path => cache.match(path)))).every(Boolean);
    if (status) status.textContent = ready ? 'Offline download ready in this browser. Test in airplane mode before leaving; clearing site data removes it.' : 'Offline download incomplete. Reconnect and reload this page.';
  }).catch(() => { if (status) status.textContent = 'Offline download failed. Reconnect and reload this page.'; });
} else {
  const status = document.getElementById('offline-status');
  if (status) status.textContent = 'Offline download is unavailable in this browser.';
}
