export default {
  naan: 99999,
  restRoot: 'https://api.biocode-fims.org/biocode-fims/rest/v2/',
  resolverRoot: 'http://localhost:8080/id/v2/',
  appRoot: '/', // When changing this, also need to change <base> tag in index.html
  mapboxToken:
    'pk.eyJ1Ijoicm9kbmV5NzU3IiwiYSI6IjAwMjFhMjNkNzkyMmI0ZWE3MmY2YzZmY2NhOGJmMjgwIn0.jUF8Mur9QX59xvbxEOKJYA',
  fimsClientId: 'Rng726w_hMKnvKSH2fUy',
  authTimeout: 1000 * 60 * 60 * 4, // 4 hrs
};
