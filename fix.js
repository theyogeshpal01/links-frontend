const fs = require('fs');
const fixFile = (f) => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/api\.get\(\/admin\/projects\/\/client-codes\)/g, 'api.get(/admin/projects/\/client-codes)');
  c = c.replace(/api\.post\(\/admin\/projects\/\/client-codes\/import, \{ codes: rawCodes \}\)/g, 'api.post(/admin/projects/\/client-codes/import, { codes: rawCodes })');
  c = c.replace(/api\.get\(\/admin\/projects\/\/quotas\)/g, 'api.get(/admin/projects/\/quotas)');
  c = c.replace(/api\.get\(\/admin\/projects\/\/qualifications\)/g, 'api.get(/admin/projects/\/qualifications)');
  c = c.replace(/api\.post\(\/admin\/projects\/\/quotas, formData\)/g, 'api.post(/admin/projects/\/quotas, formData)');
  c = c.replace(/api\.post\(\/admin\/projects\/\/qualifications, payload\)/g, 'api.post(/admin/projects/\/qualifications, payload)');
  
  // also handle the one with deleted id
  c = c.replace(/api\.delete\(\/admin\/quotas\/\/ \+ quotaId\)/g, 'api.delete(/admin/quotas/\)');
  c = c.replace(/api\.delete\(\/admin\/quotas\/\/quotaId\)/g, 'api.delete(/admin/quotas/\)');
  
  // Just in case, replace the alert without quotes
  c = c.replace(/alert\(Successfully imported  client codes\.\)/g, 'alert(Successfully imported \ client codes.)');

  fs.writeFileSync(f, c);
};

['src/components/ProjectClientLink.jsx', 'src/components/ProjectQuota.jsx', 'src/components/ProjectQualification.jsx'].forEach(fixFile);
